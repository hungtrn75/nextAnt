import WithApollo from '../../src/lib/withApollo'
import React, { Component } from 'react'
import User from '../../src/container/user'
class UserAll extends Component {
  render() {
    return <User />
  }
}

export default WithApollo(UserAll)
