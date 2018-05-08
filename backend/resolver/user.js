let InitData = [
  { userId: "1", name: "神力女超人", nickName: "Wonder Wonmen", tel: "" },
  { userId: "2", name: "蝙蝠俠", nickName: "batMan", tel: "" },
]
const Query = {
  Query: {
    UserAllQuery: () => {
      return InitData
    },
    UserOneQuery: async (_, { userId = "1" }) => {
      const result = InitData.find((item) => {
        return item.userId === userId
      })
      return result
    }
  }
}
const Mutation = {
  Mutation: {
    UserUpdate: (_, { userId, name, nickName, tel }) => {
      InitData.map((item) => {
        if (item.userId === userId) {
          item.name = name;
          item.nickName = nickName;
          item.tel = tel;
        }
        return item
      })

      return { userId, name, nickName, tel }
    },
    UserAdd: (_, { name, nickName, tel }) => {
      const userId = shortid.generate()
      const NewOne = { userId, name, nickName, tel }
      InitData = [...InitData, NewOne]
      return NewOne
    },
    UserDelete: (_, { userId }) => {
      const result = InitData.findIndex((item) => {
        return item.userId === userId
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
