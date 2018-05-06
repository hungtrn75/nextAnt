var { graphqlExpress, graphiqlExpress } = require("apollo-server-express")
var bodyParser = require("body-parser")


const ApolloMiddle = (server, schema) => server.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress(async () => {
    return {
      schema,
      // context: { user: req.user },
      // tracing: true,
      // cacheControl: true
    };
  })
);
const ApolloMiddleInterFace = (server) => {
  server.use(
    "/graphiql",
    graphiqlExpress({
      endpointURL: "/graphql",
    })
  )
};
module.exports = { ApolloMiddle, ApolloMiddleInterFace }