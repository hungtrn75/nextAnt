import React, { Component } from 'react'
import { Modal, Button } from 'antd';

export default class DetailModal extends Component {
  render() {
    return (
      <Modal
        title="Detail"
        visible={this.props.showBlock}
        onOk={() => this.props.handleDetailToggle()}
        onCancel={() => this.props.handleDetailToggle()}
      >
        <p> Content  ...</p>
      </Modal>

    )
  }
}
