import { LogicBlock } from './index'
import { Button, Modal } from 'antd'
//import FormBlock from './formBlock'

export default () => {
  return (
    <LogicBlock.Consumer>
      {({
        result: {
          modal: { value },
          toggleModal,
          assignForm
        },
        handleEvent,
        CreateForm,
        UpdateForm,
        DetailForm
      }) => {
        return (
          <Modal
            title={value.title}
            visible={toggleModal.on}
            // //   // onOk={() => this.handleUpdate()}
            onCancel={toggleModal.toggle}
            footer={[
              <Button key="back" onClick={toggleModal.toggle}>
                Cancel
              </Button>
              //          <Button key="submit" type="primary" onClick={() => this.handleUpdate(BoardAdd, data)}>新增</Button>,
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
