import { userPorfile } from '../features/auth/grapgql'

export default (ctx, apolloClient) =>
  apolloClient
    .query({ query: userPorfile })
    .then(({ data }) => ({ loginUser: data }))
    .catch(() => ({ loginUser: {} }))
