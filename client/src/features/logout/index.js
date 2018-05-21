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
const LogoutForm = props => {
  const { getFieldDecorator, resetfields } = props.form
  return (
    <Form
      onSubmit={e => props.handleLogout({ e, form: props.form })}
      className="login-form"
      resetfields={true}
    >
      <FormItem {...formTailLayout}>
        <Button type="primary" htmlType="submit">
          Logout
        </Button>
      </FormItem>
    </Form>
  )
}

export default Form.create()(LogoutForm)
