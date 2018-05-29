const mongoose = require('mongoose')
const { Schema } = mongoose
const productSchema = new Schema({
  title: String,
  content: String,
  price: String,
  hide: Boolean
})

module.exports = mongoose.model('Product', productSchema)
