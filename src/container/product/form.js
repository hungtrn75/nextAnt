import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { LogicBlock } from '../../components/crudTemplate'

const FormItem = Form.Item

class NormalForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <LogicBlock.Consumer>
        {({ handleEvent, form: { value } }) => {
          return (
            <Form
              onSubmit={e =>
                handleEvent.handleSubmit({ e, form: this.props.form })
              }
              className="login-form"
              resetFields={true}
            >
              <FormItem>
                {getFieldDecorator('Title', {
                  rules: [{ required: true, message: 'Please input Title!' }],
                  initialValue: value.Title ? value.Title : ''
                })(<Input placeholder="Title" />)}
              </FormItem>
              <FormItem>
                {getFieldDecorator('Content', {
                  rules: [{ required: true, message: 'Please input Content!' }],
                  initialValue: value.Content ? value.Content : ''
                })(<Input type="textArea" placeholder="Content" />)}
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  xxx
                </Button>
              </FormItem>
            </Form>
          )
        }}
      </LogicBlock.Consumer>
    )
  }
}
export default Form.create()(NormalForm)
