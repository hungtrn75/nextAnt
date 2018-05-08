import React, { Component } from 'react'
import { Modal, Button } from 'antd';
import { Mutation } from "react-apollo";
import { BoardAdd } from '../../graphql/board'

import Form from './form'


export default class CreateModal extends Component {
  constructor(props) {
    super(props)
  }
  handleCreate = (e) => {
    //this.props.handleCreateToggle()

    console.log(e)

    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     console.log('Received values of form: ', values);
    //   }
    // });
  }
  render() {

    return (

      <Modal
        title="新增公告"
        visible={this.props.showBlock}
        // onOk={() => this.handleCreate()}
        // onCancel={() => this.props.handleCreateToggle()}
        footer={[
          <Button key="back" onClick={() => this.props.handleCreateToggle()}>取消</Button>,
          //          <Button key="submit" type="primary" onClick={() => this.handleCreate(BoardAdd, data)}>新增</Button>,
        ]}
      >
        <p>
          <Mutation mutation={BoardAdd}>
            {(BoardAdd, { data }) => (
              <Form BoardAdd={BoardAdd}></Form>
            )}
          </Mutation>
        </p>
      </Modal>


    )
  }
}
