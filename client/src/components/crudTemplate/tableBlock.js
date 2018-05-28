import React from 'react'
import { LogicBlock } from './index'
import { Table, Button, Modal } from 'antd'
import { CREATE } from '../../components/crudTemplate'
export default () => {
  return (
    <LogicBlock.Consumer>
      {({ handleEvent, columns, dataSet, result: { isCreateButton } }) => {
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
