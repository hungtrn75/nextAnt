import React, { Component } from 'react'
import { Modal, Button } from 'antd';

export default class DetailModal extends Component {
  render() {
    return (
      <Modal
        title="詳細內容"
        visible={this.props.showBlock}
        onOk={() => this.props.handleDetailToggle()}
        onCancel={() => this.props.handleDetailToggle()}
      >
        <p> 內容  ...</p>
      </Modal>

    )
  }
}
