//template
import { Form, Icon, Input, Button, Checkbox } from 'antd'

const FormItem = Form.Item

const NormalForm = props => {
  const { getFieldDecorator } = props.form

  return (
    <Form
      onSubmit={e => props.handleSubmit({ e, form: props.form })}
      className="login-form"
      resetFields={true}
    >
      <FormItem>
        {getFieldDecorator('Title', {
          rules: [{ required: true, message: 'Please input Title!' }],
          initialValue: '123'
        })(<Input placeholder="Title" />)}
      </FormItem>
      <FormItem>
        {getFieldDecorator('Content', {
          rules: [{ required: true, message: 'Please input Content!' }],
          initialValue: '123'
        })(<Input type="textArea" placeholder="Content" />)}
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit" className="login-form-button">
          test
        </Button>
      </FormItem>
    </Form>
  )
}
export default Form.create()(NormalForm)
