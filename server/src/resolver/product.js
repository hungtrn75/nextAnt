var shortid = require('shortid')
let InitData = [
  {
    productId: '1',
    Title: 'Wonder Wonmen',
    Content: 'Wonder Wonmen is Beauty'
  },
  { productId: '2', Title: 'batMan', Content: 'batMan is Cool' }
]
const Query = {
  Query: {
    productAllQuery: () => {
      return InitData
    },
    productOneQuery: async (_, { productId = '1' }) => {
      const result = InitData.find(item => {
        return item.productId === productId
      })

      return result
    }
  }
}
const Mutation = {
  Mutation: {
    productUpdate: async (_, { productId, Title, Content }) => {
      const sleep = waitTime => {
        setTimeout(() => {}, waitTime)
      }
      await sleep(3000)
      InitData.map(item => {
        if (item.productId === productId) {
          item.Title = Title
          item.Content = Content
        }
        return item
      })

      return { Title, Content, productId }
    },
    productAdd: (_, { Title, Content }) => {
      const productId = shortid.generate()
      const NewOne = { productId, Title, Content }
      InitData = [...InitData, NewOne]

      return NewOne
    },
    productDelete: (_, { productId }) => {
      const result = InitData.findIndex(item => {
        return item.productId === productId
      })
      if (result !== undefined) {
        return InitData.splice(result, 1)
      } else {
        return {}
      }
    }
  }
}

module.exports = { Query, Mutation }
