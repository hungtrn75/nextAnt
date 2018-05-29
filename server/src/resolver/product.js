const mongoose = require('mongoose')

const Product = mongoose.model('Product')

const Query = {
  Query: {
    productAllQuery: () => {
      const products = Product.find()
      return products
    }
  }
}
const Mutation = {
  Mutation: {
    productCreate: async (_, { title, content, price, hide }) => {
      const product = new Product({ title, content, price, hide })
      //console.log('productCreate', product)
      await product.save()
      return product
    },
    productUpdate: async (_, { _id, title, content, price, hide }) => {
      await Product.findOneAndUpdate({ _id }, { title, content, price, hide })
      return _id
    },
    productDelete: async (_, { _id }) => {
      await Product.findOneAndRemove({ _id })
      return { _id }
    }
  }
}

module.exports = { Query, Mutation }
