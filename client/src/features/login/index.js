import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'

import { Form, Input, Button, Checkbox } from 'antd'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
}
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 }
}
const LoginForm = props => {
  const { getFieldDecorator, resetFields } = props.form
  return (
    <Form
      onSubmit={e => props.handleLogin({ e, form: props.form })}
      className="login-form"
      resetFields={true}
    >
      <FormItem {...formItemLayout} label="account">
        {getFieldDecorator('account', {
          rules: [
            {
              required: true,
              message: 'please input your account'
            }
          ]
        })(<Input placeholder="please input your account" />)}
      </FormItem>

      <FormItem {...formItemLayout} label="password">
        {getFieldDecorator('password', {
          rules: [
            {
              required: true,
              message: 'please input your password'
            }
          ]
        })(<Input placeholder="please input your password" />)}
      </FormItem>

      <FormItem {...formTailLayout}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </FormItem>
    </Form>
  )
}

export default Form.create()(LoginForm)
