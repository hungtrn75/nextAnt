const queries = `
     UserAllQuery:[User],
     UserOneQuery(userId:String):User
`
const typeDefs = ` type User{
  userId:String,
  name:String,
  tel:String,
  nickName:String      
}`

const mutations = `
  UserUpdate(userId:String,name:String,nickName:String,tel:String):User,
  UserAdd(name:String,nickName:String,tel:String):User,
  UserDelete(userId:String):User
`

const UserSchema = { typeDefs, queries, mutations }


module.exports = UserSchema