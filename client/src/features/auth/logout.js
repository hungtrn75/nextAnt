import React from 'react'

import { Form, Button } from 'antd'

const FormItem = Form.Item

const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 2 }
}
const LogoutForm = props => {
  const { getFieldDecorator, resetFields } = props.form
  return (
    <Form
      onSubmit={e => props.handleLogout({ e, form: props.form })}
      className="login-form"
      resetFields={true}
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
