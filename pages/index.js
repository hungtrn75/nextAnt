
import React, { Component } from 'react'
import Board from '../src/components/border'
import WithApollo from '../src/lib/withApollo'


class componentName extends Component {
  render() {
    return (
      <div><Board></Board></div>
    )
  }
}

export default WithApollo(componentName)