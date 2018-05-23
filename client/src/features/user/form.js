import React from 'react'
import { Form, Input, Button } from 'antd'
import { LogicBlock } from '../../components/crudTemplate'

const FormItem = Form.Item

const FormBlock = props => {
  const { form, handleEvent, record } = props
  const { getFieldDecorator, resetFields } = form

  return (
    <LogicBlock.Consumer>
      {({ result: { recordChoose } }) => {
        const { value } = recordChoose
        return (
          <Form className="login-form" resetFields={true}>
            <FormItem>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input email!' }],
                initialValue: value.email ? value.email : ''
              })(<Input placeholder="email" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input password!' }],
                initialValue: value.password ? value.password : ''
              })(<Input type="textArea" placeholder="password" />)}
            </FormItem>

            {props.actionText !== 'detail' ? (
              <FormItem>
                <Button
                  type="primary"
                  className="login-form-button"
                  onClick={handleEvent.handleSubmit({ form: props.form })}
                >
                  {props.actionText}
                </Button>
              </FormItem>
            ) : (
              ''
            )}
          </Form>
        )
      }}
    </LogicBlock.Consumer>
  )
}

export default Form.create()(FormBlock)
