const mongoose = require('mongoose')

const Board = mongoose.model('Board')

const Query = {
  Query: {
    boardAllQuery: async () => {
      const boards = await Board.find()
      return boards
    },
    boardQueryTotal: async (_, { title = '', content = '' }) => {
      const boards = await Board.find({
        title: { $regex: `${title}`, $options: 'i' },
        content: { $regex: `${content}`, $options: 'i' }
      })
      return { totalCount: boards.length }
    },
    boardQueryPage: async (
      _,
      { page = 1, size = 10, title = '', content = '' }
    ) => {
      const nextStart = (page - 1) * size
      const boards = await Board.find({
        title: { $regex: `${title}`, $options: 'i' },
        content: { $regex: `${content}`, $options: 'i' }
      })
        .skip(nextStart)
        .limit(size)
        .sort({ createdAt: -1 })
        .exec()
      return boards
    }
  }
}

const Mutation = {
  Mutation: {
    boardCreate: async (_, { title, content, startDate, endDate }) => {
      const board = new Board({ title, content, startDate, endDate })
      await board.save()
      const boards = await Board.find()
      return { totalCount: boards.length }
    },

    boardUpdate: async (_, { _id, title, content, startDate, endDate }) => {
      await Board.findOneAndUpdate(
        { _id },
        { title, content, startDate, endDate }
      )
      return _id
    },

    boardDelete: async (_, { _id }) => {
      await Board.findOneAndRemove({ _id })
      const boards = await Board.find()
      return { totalCount: boards.length }
      // return { _id }
    }
  }
}

module.exports = { Query, Mutation }
