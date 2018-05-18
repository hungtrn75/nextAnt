import React from 'react'
import { Form, Input, Button } from 'antd'
import { LogicBlock } from '../../components/crudTemplate'

const FormItem = Form.Item

const FormBlock = props => {
  const { form, handleEvent, record } = props
  const { getFieldDecorator, resetFields } = form

  // handleEvent.handleSubmit({ e, form })
  return (
    <LogicBlock.Consumer>
      {({ result: { recordChoose } }) => {
        const { value } = recordChoose
        return (
          <Form
            onSubmit={e => handleEvent.handleSubmit({ e, form: props.form })}
            className="login-form"
            resetFields={true}
          >
            <FormItem>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'This field is required!' }],
                initialValue: value ? value.name : ''
              })(<Input placeholder="Name" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('tel', {
                rules: [{ required: true, message: 'This field is required!' }],
                initialValue: value ? value.tel : ''
              })(<Input placeholder="Tel" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('cellphone', {
                rules: [{ required: true, message: 'This field is required!' }],
                initialValue: value ? value.cellphone : ''
              })(<Input placeholder="Cellphone" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('memo', {
                rules: [{ required: true, message: 'This field is required!' }],
                initialValue: value ? value.memo : ''
              })(<Input type="textArea" placeholder="Memo" />)}
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
