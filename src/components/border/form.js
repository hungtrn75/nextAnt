import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { CrudContext } from './index'
import { BoardAllQuery } from '../../graphql/board'

const FormItem = Form.Item

class NormalForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <CrudContext.Consumer>
        {result => {
          const { action, record, handleSubmit } = result.modal
          return (
            <Form
              onSubmit={e => handleSubmit({ e, form: this.props.form })}
              className="login-form"
              resetFields={true}
            >
              <FormItem>
                {getFieldDecorator('Title', {
                  rules: [{ required: true, message: 'Please input Title!' }],
                  initialValue: record.record ? record.record.title : ''
                })(<Input placeholder="Title" />)}
              </FormItem>
              <FormItem>
                {getFieldDecorator('Content', {
                  rules: [{ required: true, message: 'Please input Content!' }],
                  initialValue: record.record ? record.record.content : ''
                })(<Input type="textArea" placeholder="Content" />)}
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  {action}
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
