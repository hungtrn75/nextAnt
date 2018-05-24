import gql from 'graphql-tag'

export default (ctx, apolloClient) =>
  apolloClient
    .query({
      query: gql`
        query profile {
          profile {
            email
            picture
          }
        }
      `
    })
    .then(({ data }) => {
      return { loggedInUser: data }
    })
    .catch(() => {
      // Fail gracefully
      return { loggedInUser: {} }
    })
