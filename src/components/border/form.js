import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { CrudContext } from './index'

const FormItem = Form.Item

class NormalForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <CrudContext.Consumer>
        {({ modal }) => {
          console.log(modal)
          return (
            <Form
              onSubmit={modal.handleSubmit}
              className="login-form"
              resetFields={true}
            >
              <FormItem>
                {getFieldDecorator('Title', {
                  rules: [{ required: true, message: 'Please input Title!' }],
                  initialValue: modal.data ? modal.data.title : ''
                })(<Input placeholder="Title" />)}
              </FormItem>
              <FormItem>
                {getFieldDecorator('Content', {
                  rules: [{ required: true, message: 'Please input Content!' }],
                  initialValue: modal.data ? modal.data.content : ''
                })(<Input type="textArea" placeholder="Content" />)}
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={this.props.loading}
                  className="login-form-button"
                >
                  {modal.action}
                </Button>
              </FormItem>
            </Form>
          )
        }}
      </CrudContext.Consumer>
    )
  }
}
export default Form.create()(NormalForm)
