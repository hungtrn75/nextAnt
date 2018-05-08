import React, { Component } from 'react'
import { Modal, Button } from 'antd';
import { Mutation } from "react-apollo";
import { BoardAdd } from '../../graphql/board'
export default class CreateModal extends Component {
  constructor(props) {
    super(props)
  }
  handleCreate = () => {
    //this.props.handleCreateToggle()
    console.log('新增公告')
  }
  render() {

    return (
      <Mutation mutation={BoardAdd}>
        {(BoardAdd, { data }) => (
          <Modal
            title="新增公告"
            visible={this.props.showBlock}
            // onOk={() => this.handleCreate()}
            // onCancel={() => this.props.handleCreateToggle()}
            footer={[
              <Button key="back" onClick={() => this.props.handleCreateToggle()}>取消</Button>,
              <Button key="submit" type="primary" onClick={() => this.handleCreate(BoardAdd)}>新增</Button>,
            ]}
          >
            <p>



            </p>
          </Modal>
        )
        }
      </Mutation>


    )
  }
}
