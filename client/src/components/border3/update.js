import React, { Component } from 'react'
import { Modal, Button } from 'antd'
import { Mutation } from 'react-apollo'
import { BoardUpdate } from '../../graphql/board'

import Form from './form'

export default class UpdateModal extends Component {
  constructor(props) {
    super(props)
  }
  handleUpdate = e => {
    //this.props.handleUpdateToggle()
    //console.log(e)
    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     console.log('Received values of form: ', values);
    //   }
    // });
  }
  render() {
    console.log(this.props)
    return (
      <Modal
        title="Update Board"
        visible={this.props.showBlock}
        // onOk={() => this.handleUpdate()}
        // onCancel={() => this.props.handleUpdateToggle()}
        footer={[
          <Button key="back" onClick={() => this.props.handleUpdateToggle()}>
            Cancel
          </Button>
          //          <Button key="submit" type="primary" onClick={() => this.handleUpdate(BoardAdd, data)}>新增</Button>,
        ]}
      >
        <p>
          <Mutation mutation={BoardUpdate}>
            {(BoardUpdate, { data }, loading) => {
              if (loading) {
                return <div>Loading</div>
              }
              if (!this.props.updateData) {
                return <div>Loading</div>
              }
              return (
                <Form
                  forAction={'update'}
                  loading={loading}
                  initData={this.props.updateData.data}
                  BoardUpdate={BoardUpdate}
                />
              )
            }}
          </Mutation>
        </p>
      </Modal>
    )
  }
}
