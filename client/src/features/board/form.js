import React from 'react'
import { Form, Input, Button, DatePicker } from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment'

import { LogicBlock } from '../../components/crudTemplate'

const FormItem = Form.Item
const dateFormat = 'YYYY/MM/DD'

const FormBlock = props => {
  const { form, handleEvent } = props
  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 }
    }
  }
  return (
    <LogicBlock.Consumer>
      {({ result: { recordChoose } }) => {
        const { value } = recordChoose
        // console.log('value', value)
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
            <FormItem label="Start Date" {...formItemLayout}>
              {getFieldDecorator('startDate', {
                rules: [{ required: true, message: 'Please input stateDate' }],
                initialValue: value.startDate
                  ? moment(value.startDate, dateFormat)
                  : moment(moment(), dateFormat)
              })(<DatePicker format={dateFormat} />)}
            </FormItem>

            <FormItem label="End Date" {...formItemLayout}>
              {getFieldDecorator('endDate', {
                rules: [{ required: true, message: 'Please input endDate' }],
                initialValue: value.endDate
                  ? moment(value.endDate, dateFormat)
                  : moment(moment(), dateFormat)
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
  actionText: PropTypes.string,
  loading: PropTypes.bool
}

export default Form.create()(FormBlock)
