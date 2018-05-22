import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import { GlobalBlock } from '../../../src/components/layout'

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

const LoginForm = props => {
  const { getFieldDecorator, resetFields } = props.form
  return (
    <GlobalBlock.Consumer>
      {result => {
        if (!process.browser) {
          return <div />
        }
        const { loginState, handleLoginEvent } = result

        return (
          <ActionContainer>
            {({ loginAction }) => {
              const { result: resultY } = loginAction

              console.log('loginAction ', loginAction)
              const handleLogin = resultX => {
                resultX.e.preventDefault()
                resultX.form.validateFields(async (err, values) => {
                  if (!err) {
                    await loginAction.mutation({ variables: values })
                    loginAction.result.data ? resultX.form.resetFields() : ''
                  }
                })
              }

              return (
                <Form
                  onSubmit={e =>
                    handleLogin({ e, form: props.form, loginAction })
                  }
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
                    <Col span={14} style={{ textAlign: 'right' }}>
                      {loginAction.result.error ? (
                        <label style={{ marginRight: '20px', color: 'red' }}>
                          {loginAction.result.error.message}
                        </label>
                      ) : (
                        ''
                      )}

                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ marginRight: 15 }}
                      >
                        Login{' '}
                      </Button>

                      <Link href="/presonal/signup" style={{ marginLeft: 8 }}>
                        <a>Forward SignUp</a>
                      </Link>
                    </Col>
                  </Row>
                </Form>
              )
            }}
          </ActionContainer>
        )
      }}
    </GlobalBlock.Consumer>
  )
}

export default Form.create()(LoginForm)
