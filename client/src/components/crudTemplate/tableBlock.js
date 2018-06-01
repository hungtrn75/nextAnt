import React from 'react'
import { LogicBlock } from './index'
import { Table, Button, Row, Col } from 'antd'

import Pagination from './pagination'
import { CREATE } from '../../components/crudTemplate'
export default () => {
  return (
    <LogicBlock.Consumer>
      {({
        handleEvent,
        columns,
        dataSet,
        handleChangePage,
        result: { isCreateButton }
      }) => {
        return (
          <Row>
            <Col
              span={24}
              style={{ textAlign: 'right', zIndex: 9, marginBottom: '10px' }}
            >
              {!isCreateButton ? (
                <Button onClick={handleEvent.handleToggleModal(CREATE)}>
                  create
                </Button>
              ) : (
                ''
              )}
            </Col>
            <Table columns={columns} dataSource={dataSet} />
            <Pagination />
          </Row>
        )
      }}
    </LogicBlock.Consumer>
  )
}
