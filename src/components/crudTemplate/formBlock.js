import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { LogicBlock } from './index'
import { BoardAllQuery } from '../../graphql/board'

const FormItem = Form.Item

class FormBlock extends Component {
  render() {
    return (
      <LogicBlock.Consumer>
        {result => {
          console.log(result)
          return <div> 123</div>
        }}
      </LogicBlock.Consumer>
    )
  }
}
export default Form.create()(FormBlock)
