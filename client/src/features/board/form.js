import React from 'react'
import { Form, Input, Button, DatePicker } from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment'

import { LogicBlock } from '../../components/crudTemplate'

const FormItem = Form.Item
const dateFormat = 'YYYY/MM/DD'

const FormBlock = props => {
  const { form, handleEvent, record } = props
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
              {getFieldDecorator('stateDate', {
                rules: [{ required: true, message: 'Please input stateDate' }],
                defaultValue: value.stateDate
                  ? value.stateDate
                  : moment().format(dateFormat)
              })(<DatePicker format={dateFormat} />)}
            </FormItem>

            {props.actionText !== 'detail' ? (
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  onClick={handleEvent.handleSubmit(form)}
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
  record: PropTypes.object
}

export default Form.create()(FormBlock)
