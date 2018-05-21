const queries = `
`

const typeDefs = `type User {
  id: ID! @unique
  email: String! @unique
  password: String!
}
`

const mutations = `
  signup(email: String!, password: String!): String
  login(email: String!, password: String!): String
  logout: String
`

const userSchema = { typeDefs, queries, mutations }

module.exports = userSchema
