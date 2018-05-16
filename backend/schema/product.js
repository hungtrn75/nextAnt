const queries = `
     productAllQuery:[product],
     productOneQuery(productId:String):product
`
const typeDefs = ` type product{
  productId:String,
  Title:String,
  Content:String,
  StartDate:String,
  EndDate:String 
}`

const mutations = `
  productUpdate(productId:String,Title:String,Content:String):product,
  productAdd(Title:String,Content:String):product,
  productDelete(productId:String):product
`

const productSchema = { typeDefs, queries, mutations }

module.exports = productSchema
