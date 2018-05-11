const typeDefs = `type Customer {
  _id: String,
  name: String,
  tel: String,
  cellphone: String,
  memo: String
}`

const queries = `
  CustomerAllQuery: [Customer]
`

const mutations = `
`

const CustomerSchema = { typeDefs, queries }

module.exports = CustomerSchema
