import React from 'react'
import { Form, Select, Input, Button } from 'antd'
import PropTypes from 'prop-types'
const FormItem = Form.Item
const Option = Select.Option

class App extends React.Component {
  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }
  handleSelectChange = value => {
    this.props.form.setFieldsValue({
      note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form>
        <FormItem label="Note" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          {getFieldDecorator('note', {
            rules: [{ required: true, message: 'Please input your note!' }]
          })(<Input />)}
        </FormItem>

        <FormItem
          label="員工編號"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('note', {
            rules: [{ required: true, message: 'Please input your note!' }]
          })(<Input />)}
        </FormItem>

        <FormItem
          label="員工姓名"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('note', {
            rules: [{ required: true, message: 'Please input your note!' }]
          })(<Input />)}
        </FormItem>

        <FormItem label="帳號" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          {getFieldDecorator('note', {
            rules: [{ required: true, message: 'Please input your note!' }]
          })(<Input />)}
        </FormItem>
        <FormItem label="密碼" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          {getFieldDecorator('note', {
            rules: [{ required: true, message: 'Please input your note!' }]
          })(<Input />)}
        </FormItem>

        <FormItem
          label="Gender"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('gender', {
            rules: [{ required: true, message: 'Please select your gender!' }]
          })(
            <Select
              placeholder="Select a option and change input text above"
              onChange={this.handleSelectChange}
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
            </Select>
          )}
        </FormItem>
        <FormItem wrapperCol={{ span: 12, offset: 5 }}>
          <Button type="primary" onClick={this.handleSubmit}>
            Submit
          </Button>
        </FormItem>
      </Form>
    )
  }
}

App.propTypes = {
  form: PropTypes.shape({
    setFieldsValue: PropTypes.func,
    validateFields: PropTypes.func,
    getFieldDecorator: PropTypes.func
  }),
  handleEvent: PropTypes.object,
  record: PropTypes.object
}

export default Form.create()(App)
