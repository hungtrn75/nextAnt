let InitData = [
  { Title: "神力女超人", Content: "Wonder Wonmen" },
  { Title: "蝙蝠俠", Content: "batMan" },
]
const Query = {
  Query: {
    BorderAllQuery: () => {
      console.log('ooo')
      return InitData
    },
    BorderOneQuery: async (_, { BorderId = "1" }) => {
      const result = InitData.find((item) => {
        return item.BorderId === BorderId
      })

      return result
    }
  }
}
const Mutation = {
  Mutation: {
    BorderUpdate: (_, { BorderId, name, nickName, tel }) => {

      InitData.map((item) => {
        if (item.BorderId === BorderId) {
          item.name = name;
          item.nickName = nickName;
          item.tel = tel;
        }
        return item
      })

      return { BorderId, name, nickName, tel }
    },
    BorderAdd: (_, { name, nickName, tel }) => {
      const BorderId = shortid.generate()
      const NewOne = { BorderId, name, nickName, tel }
      InitData = [...InitData, NewOne]
      return NewOne
    },
    BorderDelete: (_, { BorderId }) => {
      const result = InitData.findIndex((item) => {
        return item.BorderId === BorderId
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
