import React, { Component } from 'react'

import PropTypes from 'proptypes'

import { Form, Icon, Input, Button, Checkbox } from 'antd'

import { customerAllQuery } from '../../graphql/customer'

const FormItem = Form.Item

class AntForm extends Component {
  handleSubmit = e => {
    e.preventDefault()

    const {
      form,
      forAction,
      customerCreate,
      loading,
      updateData,
      customerUpdate
    } = this.props

    form.validateFields((err, values) => {
      console.log(values)
      if (!err) {
        if (forAction === 'update') {
          values._id = updateData._id
          customerUpdate({
            variables: values,
            refetchQueries: [{ query: customerAllQuery }]
          })
        } else {
          customerCreate({
            variables: values,
            refetchQueries: [{ query: customerAllQuery }]
          })
        }
      }
    })
  }

  render() {
    const { form, updateData, loading, forAction } = this.props
    const { getFieldDecorator } = form

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'This field is required!' }],
            initialValue: updateData ? updateData.name : ''
          })(<Input placeholder="Name" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('tel', {
            rules: [{ required: true, message: 'This field is required!' }],
            initialValue: updateData ? updateData.tel : ''
          })(<Input placeholder="Tel" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('cellphone', {
            rules: [{ required: true, message: 'This field is required!' }],
            initialValue: updateData ? updateData.cellphone : ''
          })(<Input placeholder="Cellphone" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('memo', {
            rules: [{ required: true, message: 'This field is required!' }],
            initialValue: updateData ? updateData.memo : ''
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

AntForm.propTypes = {
  form: PropTypes.object.isRequired,
  forAction: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  customerCreate: PropTypes.func,
  updateData: PropTypes.object,
  customerUpdate: PropTypes.func
}

export default Form.create()(AntForm)
