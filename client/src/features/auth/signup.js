import React from 'react'

import { Row, Col, Form, Input, Button } from 'antd'
import Link from 'next/link'
import { ActionContainer, userAllQuery } from './grapgql'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
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
              await signupAction.mutation({
                variables: values,
                refetchQueries: [{ query: userAllQuery }]
              })
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
              })(
                <Input
                  type="password"
                  placeholder="please input your password"
                />
              )}
            </FormItem>

            <Row>
              {signupAction.result.error ? (
                <div>
                  <label style={{ color: 'red' }}>
                    {signupAction.result.error.message}
                  </label>
                </div>
              ) : (
                ''
              )}
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
