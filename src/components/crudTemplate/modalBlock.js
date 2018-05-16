import { LogicBlock } from './index'
import { Button, Modal } from 'antd'
import FormBlock from './formBlock'
export default () => {
  return (
    <LogicBlock.Consumer>
      {({
        result: {
          form,
          modal: { value },
          toggleModal
        }
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
            <FormBlock />
          </Modal>
        )
      }}
    </LogicBlock.Consumer>
  )
}
