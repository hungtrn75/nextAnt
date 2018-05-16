import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { LogicBlock } from '../../components/crudTemplate'

const FormItem = Form.Item

export default ({ antForm }) => {
  debugger
  return (
    <Form
      onSubmit={e => handleEvent.handleSubmit({ e, form: this.props.form })}
      className="login-form"
      resetFields={true}
    >
      <FormItem>
        {getFieldDecorator('Title', {
          rules: [{ required: true, message: 'Please input Title!' }],
          initialValue: value.Title ? value.Title : ''
        })(<Input placeholder="Title" />)}
      </FormItem>
      <FormItem>
        {getFieldDecorator('Content', {
          rules: [{ required: true, message: 'Please input Content!' }],
          initialValue: value.Content ? value.Content : ''
        })(<Input type="textArea" placeholder="Content" />)}
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit" className="login-form-button">
          xxx
        </Button>
      </FormItem>
    </Form>
  )
}
