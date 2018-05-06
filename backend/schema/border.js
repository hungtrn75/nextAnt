const queries = `
     BorderAllQuery:[Border],
     BorderOneQuery(BorderId:String):Border
`
const typeDefs = ` type Border{
  Title:String,
  Content:String,
  StartDate:String,
  EndDate:String 
}`

const mutations = `
  BorderUpdate(BorderId:String,name:String,nickName:String,tel:String):Border,
  BorderAdd(name:String,nickName:String,tel:String):Border,
  BorderDelete(BorderId:String):Border
`

const BorderSchema = { typeDefs, queries, mutations }


module.exports = BorderSchema