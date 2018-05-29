import React from 'react'

import { GlobalBlock } from '../../../src/components/layout'

import { message, Row, Icon, Col, Form, Input, Button } from 'antd'
import Link from 'next/link'
import { ActionContainer } from './grapgql'
import PropTypes from 'proptypes'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
}

const LoginForm = props => {
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
            {({ loginAction }) => {
              const handleLogin = resultX => () => {
                resultX.form.validateFields(async (err, values) => {
                  if (!err) {
                    await loginAction.mutation({ variables: values })

                    loginState.setState({ loggedIn: true })
                  }
                })
              }

              return (
                <Form className="login-form" resetFields={true}>
                  <FormItem {...formItemLayout} label="email">
                    {getFieldDecorator('email', {
                      rules: [
                        {
                          required: true,
                          message: 'please input your email'
                        }
                      ]
                    })(
                      <Input
                        placeholder="please input your email"
                        prefix={
                          <Icon
                            type="user"
                            style={{ color: 'rgba(0,0,0,.25)' }}
                          />
                        }
                      />
                    )}
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
                        prefix={
                          <Icon
                            type="lock"
                            style={{ color: 'rgba(0,0,0,.25)' }}
                          />
                        }
                        placeholder="please input your password"
                      />
                    )}
                  </FormItem>

                  <Row>
                    <Col span={14} style={{ textAlign: 'right' }}>
                      {loginAction.result.error
                        ? message.error(loginAction.result.error.message, 1)
                        : ''}

                      <Button
                        type="primary"
                        style={{ marginRight: 15 }}
                        onClick={handleLogin({ form: props.form, loginAction })}
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

FormBlock.PropTypes = {
  form: PropTypes.object
}
export default Form.create()(LoginForm)
