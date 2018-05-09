var shortid = require('shortid')
let InitData = [
  { BoardId: "1", Title: "Wonder Wonmen", Content: "Wonder Wonmen is Beauty" },
  { BoardId: "2", Title: "batMan", Content: "batMan is Cool" },
]
const Query = {
  Query: {
    BoardAllQuery: () => {
      console.log('ooo')
      return InitData
    },
    BoardOneQuery: async (_, { BoardId = "1" }) => {
      const result = InitData.find((item) => {
        return item.BoardId === BoardId
      })

      return result
    }
  }
}
const Mutation = {
  Mutation: {
    BoardUpdate: async (_, { BoardId, Title, Content }) => {
      console.log("Updating")
      const sleep = (waitTime) => { setTimeout(() => { }, waitTime) }
      await sleep(3000)
      InitData.map((item) => {
        if (item.BoardId === BoardId) {
          item.Title = Title;
          item.Content = Content;
        }
        return item
      })

      return { Title, Content, BoardId }
    },
    BoardAdd: (_, { Title, Content }) => {
      const BoardId = shortid.generate()
      const NewOne = { BoardId, Title, Content }
      InitData = [...InitData, NewOne]
      console.log('GoGoBackend')
      console.log(InitData)
      return NewOne
    },
    BoardDelete: (_, { BoardId }) => {
      console.log('GoGBackendDelete')
      const result = InitData.findIndex((item) => {
        return item.BoardId === BoardId
      })
      console.log('----')
      console.log(result)
      if (result !== undefined) {
        console.log('有找到')
        console.log(result)
        return InitData.splice(result, 1)
      } else {
        return {}
      }
    }
  }
}



module.exports = { Query, Mutation }
