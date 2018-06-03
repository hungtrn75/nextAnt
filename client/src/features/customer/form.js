import React from 'react'
import { Form, Input, Button } from 'antd'
import { LogicBlock } from '../../components/crudTemplate'
import PropTypes from 'prop-types'
const FormItem = Form.Item

const FormBlock = props => {
  const { form, handleEvent } = props
  const { getFieldDecorator } = form

  return (
    <LogicBlock.Consumer>
      {({ result: { recordChoose } }) => {
        const { value } = recordChoose
        return (
          <Form className="login-form" resetFields={true}>
            <FormItem label="Name">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'This field is required!' }],
                initialValue: value ? value.name : ''
              })(<Input placeholder="Name" />)}
            </FormItem>
            <FormItem label="Tel">
              {getFieldDecorator('tel', {
                rules: [{ required: true, message: 'This field is required!' }],
                initialValue: value ? value.tel : ''
              })(<Input placeholder="Tel" />)}
            </FormItem>
            <FormItem label="Cellphone">
              {getFieldDecorator('cellphone', {
                rules: [{ required: true, message: 'This field is required!' }],
                initialValue: value ? value.cellphone : ''
              })(<Input placeholder="Cellphone" />)}
            </FormItem>
            <FormItem label="Memo">
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
                  onClick={handleEvent.handleSubmit({ form: props.form })}
                  loading={props.loading}
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

FormBlock.propTypes = {
  form: PropTypes.object,
  handleEvent: PropTypes.object,
  record: PropTypes.object,
  actionText: PropTypes.string,
  loading: PropTypes.bool
}

export default Form.create()(FormBlock)
