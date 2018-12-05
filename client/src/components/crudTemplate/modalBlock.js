import React from 'react'
import { LogicBlock } from './index'
import { Button, Modal } from 'antd'

const ModalBlock = () => {
  return (
    <LogicBlock.Consumer>
      {({
        result: { toggleModal, assignForm, formName },
        handleEvent,
        CreateForm,
        UpdateForm,
        DetailForm
      }) => {
        return (
          <Modal
            title={`${formName.value} - ${assignForm.value}`}
            visible={toggleModal.on}
            onCancel={toggleModal.toggle}
            footer={[
              <Button key="back" onClick={toggleModal.toggle}>
                Cancel
              </Button>
            ]}
          >
            {assignForm.value === 'create' ? (
              <CreateForm handleEvent={handleEvent} />
            ) : (
              ''
            )}
            {assignForm.value === 'update' ? (
              <UpdateForm handleEvent={handleEvent} />
            ) : (
              ''
            )}
            {assignForm.value === 'detail' ? (
              <DetailForm handleEvent={handleEvent} />
            ) : (
              ''
            )}
          </Modal>
        )
      }}
    </LogicBlock.Consumer>
  )
}

export default ModalBlock
