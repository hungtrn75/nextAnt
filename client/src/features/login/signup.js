import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'

import { Row, Col, Form, Input, Button, Checkbox } from 'antd'
import Link from 'next/link'
import { ActionContainer } from './grapgql'

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
    <ActionContainer>
      {({ signupAction }) => {
        const { result } = signupAction

        const handleSignup = resultX => {
          resultX.e.preventDefault()
          resultX.form.validateFields(async (err, values) => {
            if (!err) {
              await signupAction.mutation({ variables: values })
              signupAction.result.data ? resultX.form.resetFields() : ''
            }
          })
        }

        return (
          <Form
            onSubmit={e => handleSignup({ e, form: props.form })}
            className="login-form"
            resetFields={true}
          >
            <FormItem {...formItemLayout} label="email">
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: 'please input your email'
                  }
                ]
              })(<Input placeholder="please input your email" />)}
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
              {signupAction.result.error ? <div>error</div> : ''}
              {signupAction.result.data ? <div>ok</div> : ''}

              <Col span={14} style={{ textAlign: 'right' }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: 15 }}
                >
                  Signup{' '}
                </Button>

                <Link href="/presonal/login" style={{ marginLeft: 8 }}>
                  <a>Forward Login</a>
                </Link>
              </Col>
            </Row>
          </Form>
        )
      }}
    </ActionContainer>
  )
}

export default Form.create()(SignUpForm)
