const queries = `
     productAllQuery:[product],
     productOneQuery(_id:String):product
`
const typeDefs = ` type product{
  _id:String,
  title:String,
  content:String,
  price:String,
  hide:Boolean
}`

const mutations = `
  productUpdate(_id:String,title:String,content:String,price:String,hide:Boolean):product,
  productCreate(title:String,content:String,price:String,hide:Boolean):product,
  productDelete(_id:String):product
`

const productSchema = { typeDefs, queries, mutations }

module.exports = productSchema
