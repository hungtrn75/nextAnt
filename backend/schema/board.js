const queries = `
     BoardAllQuery:[Board],
     BoardOneQuery(BoardId:String):Board
`
const typeDefs = ` type Board{
  BoardId:String,
  Title:String,
  Content:String,
  StartDate:String,
  EndDate:String 
}`

const mutations = `
  BoardUpdate(BoardId:String,Title:String,Content:String):Board,
  BoardAdd(Title:String,Content:String):Board,
  BoardDelete(BoardId:String):Board
`

const BoardSchema = { typeDefs, queries, mutations }


module.exports = BoardSchema