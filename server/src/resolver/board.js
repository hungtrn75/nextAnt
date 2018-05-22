var shortid = require('shortid')

//const jwtVerify = require('../../middleware/jwtVerify')

let InitData = [
  { BoardId: '1', Title: 'Wonder Wonmen', Content: 'Wonder Wonmen is Beauty' },
  { BoardId: '2', Title: 'batMan', Content: 'batMan is Cool' }
]

const Query = {
  Query: {
    BoardAllQuery: (parent, args, context) => {
      return InitData
    },
    BoardOneQuery: async (_, { BoardId = '1' }) => {
      const result = InitData.find(item => {
        return item.BoardId === BoardId
      })

      return result
    }
  }
}

const Mutation = {
  Mutation: {
    BoardUpdate: async (_, { BoardId, Title, Content }, { user }) => {
      const sleep = waitTime => {
        setTimeout(() => {}, waitTime)
      }
      await sleep(3000)
      InitData.map(item => {
        if (item.BoardId === BoardId) {
          item.Title = Title
          item.Content = Content
        }
        return item
      })

      return { Title, Content, BoardId }
    },
    BoardAdd: (_, { Title, Content }) => {
      const BoardId = shortid.generate()
      const NewOne = { BoardId, Title, Content }
      InitData = [...InitData, NewOne]

      return NewOne
    },
    BoardDelete: (_, { BoardId }) => {
      const result = InitData.findIndex(item => {
        return item.BoardId === BoardId
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
