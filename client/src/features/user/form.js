import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { LogicBlock } from '../../components/crudTemplate'

const FormItem = Form.Item

const FormBlock = props => {
  const { form, handleEvent, record } = props
  const { getFieldDecorator, resetfields } = form

  // handleEvent.handleSubmit({ e, form })
  return (
    <LogicBlock.Consumer>
      {({ result: { recordChoose } }) => {
        console.log('record')
        const { value } = recordChoose
        return (
          <Form
            onSubmit={e => handleEvent.handleSubmit({ e, form: props.form })}
            className="login-form"
            resetfields={true}
          >
            <FormItem>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input name!' }],
                initialValue: value.name ? value.name : ''
              })(<Input placeholder="name" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('tel', {
                rules: [{ required: true, message: 'Please input tel!' }],
                initialValue: value.tel ? value.tel : ''
              })(<Input type="textArea" placeholder="tel" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('account', {
                rules: [{ required: true, message: 'Please input account!' }],
                initialValue: value.account ? value.account : ''
              })(<Input type="textArea" placeholder="account" />)}
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
                  htmlType="submit"
                  className="login-form-button"
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
