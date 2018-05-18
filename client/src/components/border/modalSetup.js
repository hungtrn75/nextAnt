import React, { Component } from 'react'
import { Button, Modal } from 'antd'
import { CrudContext } from './index'
import NormalForm from './form'
import DetailForm from './detail'

export default class ModalSetup extends Component {
  render() {
    return (
      <CrudContext.Consumer>
        {({ modal }) => {
          let title = ''
          switch (modal.action) {
            case 'detail':
              title = 'Detail'
              break
            case 'update':
              title = 'Update'
              break
            case 'create':
              title = 'Create'
              break
          }
          return (
            <Modal
              title={title}
              visible={modal.showModal}
              // onOk={() => this.handleUpdate()}
              onCancel={modal.handleToggleModal}
              footer={[
                <Button key="back" onClick={modal.handleToggleModal}>
                  Cancel
                </Button>
                //          <Button key="submit" type="primary" onClick={() => this.handleUpdate(BoardAdd, data)}>新增</Button>,
              ]}
            >
              {modal.action === 'detail' ? <DetailForm /> : <NormalForm />}
            </Modal>
          )
        }}
      </CrudContext.Consumer>
    )
  }
}
