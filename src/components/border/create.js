import React, { Component } from 'react'
import { Modal, Button } from 'antd';

export default class CreateModal extends Component {
  render() {
    return (
      <Modal
        title="新增公告"
        visible={this.props.showBlock}
        onOk={() => this.props.handleCreateToggle()}
        onCancel={() => this.props.handleCreateToggle()}
      >
        <p> 內容  ...</p>
      </Modal>

    )
  }
}
