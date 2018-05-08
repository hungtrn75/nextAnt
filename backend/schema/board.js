const queries = `
     BoardAllQuery:[Board],
     BoardOneQuery(BoardId:String):Board
`
const typeDefs = ` type Board{
  Title:String,
  Content:String,
  StartDate:String,
  EndDate:String 
}`

const mutations = `
  BoardUpdate(BoardId:String,name:String,nickName:String,tel:String):Board,
  BoardAdd(name:String,nickName:String,tel:String):Board,
  BoardDelete(BoardId:String):Board
`

const BoardSchema = { typeDefs, queries, mutations }


module.exports = BoardSchema