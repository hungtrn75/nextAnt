var shortid = require('shortid')

let InitData = [
  { userId: '1', name: '神力女超人', nickName: 'Wonder Wonmen', tel: '' },
  { userId: '2', name: '蝙蝠俠', nickName: 'batMan', tel: '' }
]
const Query = {
  Query: {
    userAllQuery: () => {
      return InitData
    },
    userOneQuery: async (_, { userId = '1' }) => {
      const result = InitData.find(item => {
        return item.userId === userId
      })
      return result
    }
  }
}
const Mutation = {
  Mutation: {
    userUpdate: (_, { userId, name, nickName, tel, account, password }) => {
      InitData.map(item => {
        if (item.userId === userId) {
          item.name = name
          item.nickName = nickName
          item.tel = tel
          item.account = account
          item.password = password
        }
        return item
      })

      return { userId, name, nickName, tel }
    },
    userAdd: (_, { name, nickName, tel, account, password }) => {
      const userId = shortid.generate()
      const NewOne = { userId, name, nickName, tel, account, password }
      InitData = [...InitData, NewOne]
      return NewOne
    },
    userDelete: (_, { userId }) => {
      const result = InitData.findIndex(item => {
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
