const mongoose = require('mongoose')

//const { getUserId } = require('../utils')

const Board = mongoose.model('Board')

const Query = {
  Query: {
    boardAllQuery: async (_, args, context) => {
      const board = await Board.find()
      return board
    }
  }
}

const Mutation = {
  Mutation: {
    boardCreate: (_, { title, content }) => {
      const board = new Board({ title, content })
      return NewOne
    },
    boardUpdate: async (_, { _id, title, content }) => {
      await Board.findOneAndUpdate({ _id }, { title, content })
      return _id
    },
    boardDelete: async (_, { _id }) => {
      await Board.findOneAndRemove({ _id })
      return { _id }
    }
  }
}

module.exports = { Query, Mutation }
