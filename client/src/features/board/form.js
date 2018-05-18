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
              {getFieldDecorator('Title', {
                rules: [{ required: true, message: 'Please input Title!' }],
                initialValue: value.title ? value.title : ''
              })(<Input placeholder="Title" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('Content', {
                rules: [{ required: true, message: 'Please input Content!' }],
                initialValue: value.content ? value.content : ''
              })(<Input type="textArea" placeholder="Content" />)}
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
