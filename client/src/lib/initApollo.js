import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import * as fetch from 'isomorphic-unfetch'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import envs from '../../config/envs'

let apolloClient = null
if (!process.browser) {
  global.fetch = fetch
}

let token
const withToken = setContext((_, { headers }) => {
  // if you have a cached value, return it immediately
  //if (token) return { token }
  if (!process.browser) {
    return
  }
  loginInfoData = JSON.parse(localStorage.getItem('loginInfo'))
  if (loginInfoData.token) {
    token = loginInfoData.token
  }
  return {
    headers: {
      ...headers,
      authorization: token || null
    }
  }
  // } else {
  //   return {}
  // }
  console.log('middle gogo')
})

// const resetToken = onError(({ networkError }) => {
//   if (networkError && networkError.statusCode === 401) {
//     // remove cached token on 401 from the server
//     token = null;
//   }
// });

//const authFlowLink = withToken.concat(resetToken)

// console.log(authFlowLink)

const create = initialState => {
  const credentials = 'readbook'

  const uri = `${envs.serverURL}/graphql`

  const httpLink2 = new HttpLink({ uri, credentials })

  //  link: ApolloLink.from([withToken, httpLink2]),

  return new ApolloClient({
    ssrMode: !process.browser,
    link: httpLink2,
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
