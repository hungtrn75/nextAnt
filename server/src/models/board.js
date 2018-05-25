const mongoose = require('mongoose')
const { Schema } = mongoose

const BoardSchema = new Schema({
  _id: String,
  title: String,
  content: String,
  startDate: String,
  endDate: String,
  createdAt: { type: Date, default: Date.now }
})

mongoose.model('Board', BoardSchema)
