import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import { BoardAllQuery } from '../graphql/border'



class GetData extends Component {
  render() {
    return this.props.children(this.props);
  }
}
export default graphql(BoardAllQuery)(GetData)