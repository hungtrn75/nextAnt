import { LogicBlock } from './index'
import { Button, Modal } from 'antd'
import FormBlock from './formBlock'
import Form2 from '../../container/product/form'

export default () => {
  return (
    <LogicBlock.Consumer>
      {({
        result: {
          modal: { value },
          toggleModal
        },
        handleEvent
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
            <div>
              <Form2 handleEvent={handleEvent} />
            </div>
          </Modal>
        )
      }}
    </LogicBlock.Consumer>
  )
}
