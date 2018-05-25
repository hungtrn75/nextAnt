const mongoose = require('mongoose')

//const { getUserId } = require('../utils')

const Board = mongoose.model('Board')

const Query = {
  Query: {
    boardAllQuery: async (_, args, context) => {
      const boards = await Board.find()
      return boards
    }
  }
}

const Mutation = {
  Mutation: {
    boardCreate: async (_, { title, content }) => {
      const board = new Board({ title, content })
      await board.save()
      return board
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
