import { LogicBlock } from './index'
import { Table, Icon, Divider, Button, Modal } from 'antd'
import { CREATE } from '../../components/crudTemplate'
export default () => {
  return (
    <LogicBlock.Consumer>
      {({
        handleEvent,
        columns,
        dataSet,
        result: {
          container: {
            query: { data }
          },
          toggleModal,
          crudInfo: {
            value: { queryName }
          },
          isCreateButton
        }
      }) => {
        return (
          <div>
            <Table columns={columns} dataSource={dataSet} />
            {!isCreateButton ? (
              <Button onClick={handleEvent.handleToggleModal(CREATE)}>
                create
              </Button>
            ) : (
              ''
            )}
          </div>
        )
      }}
    </LogicBlock.Consumer>
  )
}
