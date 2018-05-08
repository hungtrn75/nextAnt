let InitData = [
  { Title: "神力女超人", Content: "Wonder Wonmen" },
  { Title: "蝙蝠俠", Content: "batMan" },
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
    BoardAdd: (_, { name, nickName, tel }) => {
      const BoardId = shortid.generate()
      const NewOne = { BoardId, name, nickName, tel }
      InitData = [...InitData, NewOne]
      return NewOne
    },
    BoardDelete: (_, { BoardId }) => {
      const result = InitData.findIndex((item) => {
        return item.BoardId === BoardId
      })
      if (result) {
        return InitData.splice(result, 1)
      } else {
        return {}
      }
    }
  }
}



module.exports = { Query, Mutation }
