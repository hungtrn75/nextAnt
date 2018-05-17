import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import * as fetch from 'isomorphic-unfetch'

import envs from '../../config/envs'

let apolloClient = null

if (!process.browser) {
  global.fetch = fetch
}

const create = initialState => {
  const credentials = 'readbook'

  const uri = `${envs.serverURL}/graphql`

  const httpLink2 = new HttpLink({ uri, credentials })

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
