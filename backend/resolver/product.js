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
      console.log('ooo')
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
      console.log('Updating')
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
      console.log('GoGoBackend')
      console.log(InitData)
      return NewOne
    },
    productDelete: (_, { productId }) => {
      console.log('GoGBackendDelete')
      const result = InitData.findIndex(item => {
        return item.productId === productId
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
