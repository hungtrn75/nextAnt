import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import { UserAllQuery } from '../../graphql/user'
import { BorderAllQuery } from '../../graphql/border'



class GetData extends Component {
  render() {
    return this.props.children(this.props);
  }
}
export default graphql(BorderAllQuery)(GetData)