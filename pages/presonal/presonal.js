import React, { Component } from 'react'

import { Form, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};
class DynamicRule extends React.Component {
  state = {
    checkNick: false,
  };
  check = () => {
    this.props.form.validateFields(
      (err) => {
        if (!err) {
          console.info('success');
        }
      },
    );
  }
  handleChange = (e) => {
    this.setState({
      checkNick: e.target.checked,
    }, () => {
      this.props.form.validateFields(['nickname'], { force: true });
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {

        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} >
          <FormItem {...formItemLayout} label="帳號">
            {getFieldDecorator('account', {
              rules: [{
                required: true,
                message: '請輸入你的帳號',
              }],
              initialValue: '123'
            })(
              <Input placeholder="請輸入你的帳號" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="密碼">
            {getFieldDecorator('password', {
              rules: [{
                required: true,
                message: '請輸入你的密碼',
              }],
            })(
              <Input placeholder="請輸入你的密碼" />
            )}
          </FormItem>

          <FormItem {...formTailLayout}>
            <Button type="primary" htmlType="submit">
              確定送出
          </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(DynamicRule);