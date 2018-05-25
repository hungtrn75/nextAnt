import React from 'react'
import { Form, Button } from 'antd'

const FormItem = Form.Item

import { GlobalBlock } from '../../../src/components/layout'
import { ActionContainer } from './grapgql'

const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 2 }
}
const LogoutForm = props => {
  const { getFieldDecorator, resetFields } = props.form

  return (
    <GlobalBlock.Consumer>
      {result => {
        if (!process.browser) {
          return <div />
        }

        const { loginState } = result

        return (
          <ActionContainer>
            {({ logoutAction }) => {
              const handleLogout = async e => {
                e.preventDefault()
                await logoutAction.mutation()
                loginState.setState({ loginUser: null })
              }

              return (
                <Form
                  onSubmit={handleLogout}
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
            }}
          </ActionContainer>
        )
      }}
    </GlobalBlock.Consumer>
  )
}

export default Form.create()(LogoutForm)
