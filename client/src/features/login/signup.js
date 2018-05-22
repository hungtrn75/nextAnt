import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'

import { Row, Col, Form, Input, Button, Checkbox } from 'antd'
import Link from 'next/link'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
}
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 }
}

const SignUpForm = props => {
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

      <Row>
        <Col span={14} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit" style={{ marginRight: 15 }}>
            Signup{' '}
          </Button>

          <Link href="/presonal/login" style={{ marginLeft: 8 }}>
            <a>Login</a>
          </Link>
        </Col>
      </Row>
    </Form>
  )
}

export default Form.create()(SignUpForm)
