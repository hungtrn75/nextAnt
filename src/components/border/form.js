import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { BoardAllQuery, BoardUpdate } from '../../graphql/board'

const FormItem = Form.Item;

class NormalForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        if (this.props.forAction === "update") {
          values.BoardId = this.props.initData.BoardId;
          this.props.BoardUpdate({ variables: values, refetchQueries: [{ query: BoardAllQuery }] })
        } else {
          this.props.BoardAdd({ variables: values, refetchQueries: [{ query: BoardAllQuery }] })
        }

      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    console.log('------------form')
    console.log(this.props)

    return (

      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('Title', {
            rules: [{ required: true, message: 'Please input Title!' }],
            initialValue: (this.props.initData) ? this.props.initData.title : ""
          })(
            <Input placeholder="Title" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('Content', {
            rules: [{ required: true, message: 'Please input Content!' }],
            initialValue: (this.props.initData) ? this.props.initData.content : ""
          })(
            <Input type="textArea" placeholder="Content" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            {(this.props.forAction === "update") ? "update" : "create"}

          </Button>
        </FormItem>

      </Form>

    );
  }
}
export default Form.create()(NormalForm);