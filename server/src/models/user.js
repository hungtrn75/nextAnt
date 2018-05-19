const mongoose = require('mongoose')
const { Schema } = mongoose

const customerSchema = new Schema({
  name: String,
  tel: String,
  cellphone: String,
  memo: String,
  account: String,
  password: String,
  createdAt: { type: Date, default: Date.now }
})

mongoose.model('Customer', customerSchema)
