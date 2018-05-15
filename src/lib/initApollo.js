import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import * as fetch from 'isomorphic-unfetch'
import { ApolloLink, concat } from 'apollo-link'

let apolloClient = null
if (!process.browser) {
  global.fetch = fetch
}

function create(initialState) {
  const credentials = 'readbook'

  const uri =
    process.env.NODE_ENV !== 'production'
      ? `http://localhost:3000/graphql`
      : 'http://localhost:3000/graphql'
  //  const uri = `http://localhost:3000/graphql`

  const httpLink2 = new HttpLink({ uri, credentials })

  return new ApolloClient({
    ssrMode: !process.browser,
    link: httpLink2,
    cache: new InMemoryCache().restore(initialState || {})
  })
}

export default function initApollo(initialState) {
  if (!process.browser) {
    return create(initialState)
  }
  if (!apolloClient) {
    apolloClient = create(initialState)
  }
  return apolloClient
}
