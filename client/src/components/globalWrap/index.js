import React, { Component } from 'react'

export default InComponent => {
  return class globalWrap extends Component {
    static async getInitialProps({ req }) {
      return {}
    }
    render() {
      return <InComponent />
    }
  }
}
