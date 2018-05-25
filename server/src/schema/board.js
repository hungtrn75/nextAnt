const queries = `
     boardAllQuery:[board],
     boardOneQuery(_id:String):board
`
const typeDefs = ` type board{
  _id:String,
  Title:String,
  Content:String,
  StartDate:String,
  EndDate:String  
  
}`

const mutations = `
  boardUpdate(_id:String,Title:String,Content:String):board,
  boardCreate(Title:String,Content:String):board,
  boardDelete(_id:String):board
`

const boardSchema = { typeDefs, queries, mutations }

module.exports = boardSchema
