const mongoose = require('mongoose')
const { Schema } = mongoose

const BoardSchema = new Schema({
  title: String,
  content: String,
  startDate: Date,
  endDate: Date,
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Board', BoardSchema)
