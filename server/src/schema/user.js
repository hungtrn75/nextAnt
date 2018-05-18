const queries = `
     userAllQuery:[user],
     userOneQuery(userId:String):user
`
const typeDefs = ` type user{
  userId:String,
  name:String,
  tel:String,
  nickName:String,
  account:String,
  password:String
}`

const mutations = `
  userUpdate(userId:String,name:String,nickName:String,tel:String,account:String,password:String):user,
  userAdd(name:String,nickName:String,tel:String,account:String,password:String):user,
  userDelete(userId:String):user
`

const userSchema = { typeDefs, queries, mutations }

module.exports = userSchema
