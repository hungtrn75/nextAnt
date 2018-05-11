const typeDefs = `type Customer {
  _id: String,
  name: String,
  tel: String,
  cellphone: String,
  memo: String
}`

const queries = `
  customerAllQuery: [Customer]
`

const mutations = `
  customerAdd(name: String, tel: String, cellphone: String, memo: String): Customer
`

const CustomerSchema = { typeDefs, queries, mutations }

module.exports = CustomerSchema
