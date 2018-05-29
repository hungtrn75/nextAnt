import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import PropTypes from 'prop-types'
import { LogicBlock } from '../../components/crudTemplate'

const FormItem = Form.Item

const FormBlock = props => {
  const { form, handleEvent, actionText, loading } = props
  const { getFieldDecorator } = form

  return (
    <LogicBlock.Consumer>
      {({ result: { recordChoose } }) => {
        const { value } = recordChoose
        return (
          <Form className="login-form" resetFields={true}>
            <FormItem>
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please input title!' }],
                initialValue: value.title ? value.title : ''
              })(<Input placeholder="title" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('content', {
                rules: [{ required: true, message: 'Please input content!' }],
                initialValue: value.content ? value.content : ''
              })(<Input type="textArea" placeholder="content" />)}
            </FormItem>

            <FormItem>
              {getFieldDecorator('price', {
                rules: [{ required: true, message: 'Please input price!' }],
                initialValue: value.price ? value.price : ''
              })(<Input type="textArea" placeholder="price" />)}
            </FormItem>

            <FormItem>
              {getFieldDecorator('hide', {})(
                <Checkbox defaultChecked={value.hide} />
              )}
            </FormItem>

            {props.actionText !== 'detail' ? (
              <FormItem>
                <Button
                  type="primary"
                  className="login-form-button"
                  onClick={handleEvent.handleSubmit({ form })}
                  loading={loading}
                >
                  {actionText}
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
FormBlock.propTypes = {
  form: PropTypes.object,
  handleEvent: PropTypes.object,
  record: PropTypes.object,
  actionText: PropTypes.string,
  loading: PropTypes.bool
}

export default Form.create()(FormBlock)
