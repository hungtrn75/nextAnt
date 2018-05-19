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
  const handleSubmit = async resultX => {
    resultX.e.preventDefault()
    resultX.form.validateFields(async (err, values) => {
      if (!err) {
        fetch('http://localhost:8080/auth/login', {
          method: 'post',
          body: JSON.stringify(values),
          mode: 'cors',
          headers: {
            Accept:
              'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/json'
          }
        })
          .then(Response => {
            return Response.json()
          })
          .then(
            (result => {
              console.log(result.success)
              return localStorage.setItem('loginInfo', JSON.stringify(result))
            }).then(() => {})
          )
      }
    })
  }

  const { getFieldDecorator, resetFields } = props.form
  return (
    <Form
      onSubmit={e => handleSubmit({ e, form: props.form })}
      className="login-form"
      resetFields={true}
    >
      <FormItem {...formItemLayout} label="帳號">
        {getFieldDecorator('account', {
          rules: [
            {
              required: true,
              message: '請輸入你的帳號'
            }
          ]
        })(<Input placeholder="請輸入你的帳號" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="密碼">
        {getFieldDecorator('password', {
          rules: [
            {
              required: true,
              message: '請輸入你的密碼'
            }
          ]
        })(<Input placeholder="請輸入你的密碼" />)}
      </FormItem>

      <FormItem {...formTailLayout}>
        <Button type="primary" htmlType="submit">
          確定送出
        </Button>
      </FormItem>
    </Form>
  )
}

export default Form.create()(LoginForm)
