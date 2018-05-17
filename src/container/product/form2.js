import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { LogicBlock } from '../../components/crudTemplate'

const FormItem = Form.Item

class FormBlock extends Component {
  render() {
    const { form, handleEvent, record } = this.props
    const { getFieldDecorator, resetFields } = form
    // handleEvent.handleSubmit({ e, form })
    return (
      <Form
        onSubmit={e => console.log('test')}
        className="login-form"
        resetFields={true}
      >
        <FormItem>
          {getFieldDecorator('Title', {
            rules: [{ required: true, message: 'Please input Title!' }]
          })(<Input placeholder="Title" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('Content', {
            rules: [{ required: true, message: 'Please input Content!' }]
          })(<Input type="textArea" placeholder="Content" />)}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            test
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(FormBlock)
