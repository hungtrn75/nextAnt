const queries = `
  boardAllQuery:[board],
  boardQueryTotal:Total,
  boardQueryPage(page:Int,size:Int):[board],
  boardOneQuery(_id:String):board
`

const typeDefs = ` 
scalar Date
type Total{
   totalCount:Int
}

type board {
  _id:String,
  title:String,
  content:String,
  startDate:Date,
  endDate:Date  
}`

const mutations = `
  boardUpdate(_id:String,title:String,content:String,startDate:Date,endDate:Date):board,
  boardCreate(title:String,content:String,startDate:Date,endDate:Date):Total,
  boardDelete(_id:String):Total
`

const boardSchema = { typeDefs, queries, mutations }

module.exports = boardSchema
