import WithApollo from '../../src/lib/withApollo'
import React, { Component } from 'react'
import Product from '../../src/container/product'
class ProductAll extends Component {
  render() {
    return <Product />
  }
}

export default WithApollo(ProductAll)
