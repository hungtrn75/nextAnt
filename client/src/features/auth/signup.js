import React from 'react'

import { message, Row, Col, Form, Input, Button } from 'antd'
import Link from 'next/link'

import { GlobalBlock } from '../../../src/components/layout'
import { ActionContainer, userAllQuery } from './grapgql'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
}

const SignUpForm = props => {
  const { getFieldDecorator } = props.form

  return (
    <GlobalBlock.Consumer>
      {result => {
        if (!process.browser) {
          return <div />
        }

        const { loginState } = result

        return (
          <ActionContainer>
            {({ signupAction }) => {
              const handleSignup = form => () => {
                form.validateFields(async (err, values) => {
                  if (!err) {
                    const result = await signupAction.mutation({
                      variables: values,
                      refetchQueries: [{ query: userAllQuery }]
                    })
                    signupAction.result.data ? form.resetFields() : ''
                    loginState.setState({ loginUser: result.data.signup })
                  }
                })
              }

              return (
                <Form className="login-form">
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
              {signupAction.result.error
                ? message.error(signupAction.result.error.message, 1)
                : ''}
              {signupAction.result.data ? <div>ok</div> : ''}
                    <Col span={14} style={{ textAlign: 'right' }}>
                      <Button
                        type="primary"
                        style={{ marginRight: 15 }}
                        onClick={handleSignup(props.form)}
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
      }}
    </GlobalBlock.Consumer>
  )
}

export default Form.create()(SignUpForm)
