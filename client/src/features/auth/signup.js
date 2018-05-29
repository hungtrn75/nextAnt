import React from 'react'
import { message, Row, Col, Form, Input, Button, Icon } from 'antd'

import { GlobalBlock } from '../../../src/components/layout'
import { ActionContainer, userAllQuery } from './grapgql'
import goto from '../../lib/goto'

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
                    goto('/')()
                  }
                })
              }

              return (
                <Form className="login-form">
                  <FormItem {...formItemLayout} label="Email">
                    {getFieldDecorator('email', {
                      rules: [
                        {
                          required: true,
                          message: 'please enter your email'
                        }
                      ]
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="user"
                            style={{ color: 'rgba(0,0,0,.25)' }}
                          />
                        }
                        placeholder="email"
                      />
                    )}
                  </FormItem>

                  <FormItem {...formItemLayout} label="Password">
                    {getFieldDecorator('password', {
                      rules: [
                        {
                          required: true,
                          message: 'please enter your password'
                        }
                      ]
                    })(
                      <Input
                        type="password"
                        prefix={
                          <Icon
                            type="lock"
                            style={{ color: 'rgba(0,0,0,.25)' }}
                          />
                        }
                        placeholder="password"
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
                        Sign Up{' '}
                      </Button>
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
