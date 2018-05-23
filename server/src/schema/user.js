const typeDefs = `
type User {
  _id: ID! @unique
  email: String! @unique
  password: String!
}

type AuthPayload {
  token: String
}

type Profile {
  email: String
}
`

const queries = `
  userAllQuery: [User]
  profile: Profile
`

const mutations = `
  signup(email: String!, password: String!): AuthPayload
  login(email: String!, password: String!): AuthPayload
  logout: AuthPayload
  userDelete(_id:String!): User
`

const userSchema = { typeDefs, queries, mutations }

module.exports = userSchema
