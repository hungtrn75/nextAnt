import React, { Component } from 'react'
import { Modal, Button } from 'antd';

export default class DetailModal extends Component {
  render() {
    const content = (this.props.detailData) ? this.props.detailData.data.content : ""
    return (
      <Modal
        title="Detail"
        visible={this.props.showBlock}
        onOk={() => this.props.handleDetailToggle()}
        onCancel={() => this.props.handleDetailToggle()}
      >
        <p>{content}</p>
      </Modal>

    )
  }
}
