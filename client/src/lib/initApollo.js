import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import * as fetch from 'isomorphic-unfetch'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'

import envs from '../../config/envs'

let apolloClient = null
if (!process.browser) {
  global.fetch = fetch
}

let token
const withToken = setContext((_, { headers }) => {
  if (token) {
    return {
      ...headers,
      authorization: token
    }
  }

  //const loginInfoData = JSON.parse(localStorage.getItem('loginInfo'))
  //if (loginInfoData.token) { token = loginInfoData.token }

  return {
    headers: {
      ...headers,
      authorization: token
    }
  }
  //console.log('middle gogo')
})

const resetToken = onError(({ networkError }) => {
  if (networkError && networkError.statusCode === 401) {
    //reset token
  }
})

const authFlowLink = withToken.concat(resetToken)

// console.log(authFlowLink)

const create = initialState => {
  const credentials = 'readbook'

  const uri = `${envs.serverURL}/graphql`

  const httpLink2 = new HttpLink({ uri, credentials })

  return new ApolloClient({
    ssrMode: !process.browser,
    link: authFlowLink.concat(httpLink2),
    cache: new InMemoryCache().restore(initialState || {})
  })
}

export default initialState => {
  if (!process.browser) return create(initialState)
  if (!apolloClient) {
    apolloClient = create(initialState)
  }
  return apolloClient
}
