import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import * as fetch from 'isomorphic-unfetch'

import envs from '../../config/envs'

let apolloClient = null

if (!process.browser) {
  global.fetch = fetch
}

const link = createHttpLink({
  uri: `${envs.serverURL}/graphql`,
  credentials: 'include'
})

const create = initialState =>
  new ApolloClient({
    ssrMode: !process.browser,
    link: link,
    cache: new InMemoryCache().restore(initialState || {})
  })

export default initialState => {
  if (!process.browser) return create(initialState)
  if (!apolloClient) {
    apolloClient = create(initialState)
  }
  return apolloClient
}
