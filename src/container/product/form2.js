import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { LogicBlock } from '../../components/crudTemplate'

const FormItem = Form.Item

class NormalForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form>
        <FormItem>
          <Input placeholder="Title" />)
        </FormItem>
      </Form>
    )
  }
}
export default Form.create()(NormalForm)
