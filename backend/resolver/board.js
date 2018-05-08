var shortid = require('shortid')
let InitData = [
  { BoardId: "1", Title: "神力女超人", Content: "Wonder Wonmen" },
  { BoardId: "2", Title: "蝙蝠俠", Content: "batMan" },
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
    BoardUpdate: (_, { BoardId, name, nickName, tel }) => {

      InitData.map((item) => {
        if (item.BoardId === BoardId) {
          item.name = name;
          item.nickName = nickName;
          item.tel = tel;
        }
        return item
      })

      return { BoardId, name, nickName, tel }
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
