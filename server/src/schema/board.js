const queries = `
     boardAllQuery:[board],
     boardOneQuery(_id:String):board
`

const typeDefs = ` 

scalar Date

type board{
  
  _id:String,
  title:String,
  content:String,
  startDate:Date,
  endDate:Date  
  
}`

const mutations = `
  boardUpdate(_id:String,title:String,content:String,startDate:Date,endDate:Date):board,
  boardCreate(title:String,content:String,startDate:Date,endDate:Date):board,
  boardDelete(_id:String):board
`

const boardSchema = { typeDefs, queries, mutations }

module.exports = boardSchema
