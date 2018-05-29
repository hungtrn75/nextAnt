import React from 'react'
import PropTypes from 'prop-types'
import { message, Row, Icon, Col, Form, Input, Button } from 'antd'

import { GlobalBlock } from '../../../src/components/layout'
import { ActionContainer, userAllQuery } from './grapgql'
import goto from '../../lib/goto'

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
                    const result = await loginAction.mutation({
                      variables: values,
                      refetchQueries: [{ query: userAllQuery }]
                    })
                    loginState.setState({ loginUser: result.data.login })
                    goto('/')()
                  }
                })
              }

              return (
                <Form className="login-form" resetFields={true}>
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
                    <Col span={14} style={{ textAlign: 'right' }}>
                      {loginAction.result.error
                        ? message.error(loginAction.result.error.message, 1)
                        : ''}

                      <Button
                        type="primary"
                        style={{ marginRight: 15 }}
                        onClick={handleLogin({ form: props.form, loginAction })}
                      >
                        Log In{' '}
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

LoginForm.PropTypes = {
  form: PropTypes.object
}

export default Form.create()(LoginForm)
