import React, { Component } from 'react'

import { Form, Icon, Input, Button, Checkbox } from 'antd'

import { customerAllQuery } from '../../graphql/customer'

const FormItem = Form.Item

class AntForm extends Component {
  handleSubmit = e => {
    e.preventDefault()

    const { form, forAction, customerAdd, loading, toggleModle } = this.props

    form.validateFields((err, values) => {
      console.log(values)

      if (!err) {
        if (forAction === 'update') {
          values._id = initData._id
        } else {
          customerAdd({
            variables: values,
            refetchQueries: [{ query: customerAllQuery }]
          })
        }
      }
    })
  }

  render() {
    const { form, initData, loading, forAction } = this.props
    const { getFieldDecorator } = form

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'This field is required!' }],
            initialValue: initData ? initData.name : ''
          })(<Input placeholder="Name" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('tel', {
            rules: [{ required: true, message: 'This field is required!' }],
            initialValue: initData ? initData.tel : ''
          })(<Input placeholder="Tel" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('cellphone', {
            rules: [{ required: true, message: 'This field is required!' }],
            initialValue: initData ? initData.cellphone : ''
          })(<Input placeholder="Cellphone" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('memo', {
            rules: [{ required: true, message: 'This field is required!' }],
            initialValue: initData ? initData.meme : ''
          })(<Input type="textArea" placeholder="Memo" />)}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" loading={loading}>
            {forAction === 'update' ? 'update' : 'create'}
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(AntForm)
