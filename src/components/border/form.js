import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { BoardAllQuery } from '../../graphql/board'

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.BoardAdd({ variables: values, refetchQueries: [{ query: BoardAllQuery }] })
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (

      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('Title', {
            rules: [{ required: true, message: 'Please input Title!' }],
          })(
            <Input placeholder="Title" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('Content', {
            rules: [{ required: true, message: 'Please input Content!' }],
          })(
            <Input type="textArea" placeholder="Content" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            create
          </Button>
        </FormItem>

      </Form>

    );
  }
}
export default Form.create()(NormalLoginForm);