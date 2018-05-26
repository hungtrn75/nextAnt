const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const bodyParser = require('body-parser')

const apolloMiddle = (server, schema) =>
  server.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress((req, res) => {
      return {
        schema,
        context: { req, res }
      }
    })
  )

const apolloMiddleInterFace = server => {
  server.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql'
    })
  )
}

module.exports = { apolloMiddle, apolloMiddleInterFace }
