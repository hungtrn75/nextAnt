import React, { Component } from 'react'

export default InComponent => {
  return class globalWrap extends Component {
    static async getInitialProps({ req }) {
      //const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
      console.log('-------')
      return {}
    }
    render() {
      return <InComponent />
    }
  }
}
