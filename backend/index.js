var { makeExecutableSchema } = require('graphql-tools')
var AllDef = require('./schema')
var AllResolvers = require('./resolver')

//console.log(AllDef)
//console.log(AllResolvers)

let typeDefs = []
let queries = []
let mutations = []

AllDef.forEach(s => {
  //console.log(s)
  typeDefs.push(s.typeDefs);
  queries.push(s.queries);
  mutations.push(s.mutations);
});

const RootQuery = ` type Query {   ${[...queries]}  } 
                    type Mutation{ ${[...mutations]}}`;


const SchemaDefinition = `schema {  query: Query,  mutation: Mutation} `;
const result = makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery, ...typeDefs],
  resolvers: AllResolvers
})

module.exports = result