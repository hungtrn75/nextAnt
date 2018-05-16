import React, { Component } from 'react'
import { Modal, Button } from 'antd'
import { Mutation } from 'react-apollo'
import { BoardAdd } from '../../graphql/board'

import Form from './form'

export default class CreateModal extends Component {
  constructor(props) {
    super(props)
  }
  handleCreate = e => {
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
        title="Create Board"
        visible={this.props.showBlock}
        // onOk={() => this.handleCreate()}
        onCancel={() => this.props.handleCreateToggle()}
        footer={[
          <Button key="back" onClick={() => this.props.handleCreateToggle()}>
            Cancel
          </Button>
          //          <Button key="submit" type="primary" onClick={() => this.handleCreate(BoardAdd, data)}>新增</Button>,
        ]}
      >
        <p>
          <Mutation mutation={BoardAdd}>
            {(BoardAdd, { data }, loading) => (
              <Form
                forAction={'create'}
                loading={loading}
                BoardAdd={BoardAdd}
              />
            )}
          </Mutation>
        </p>
      </Modal>
    )
  }
}
