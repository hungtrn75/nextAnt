import React from 'react'
import { LogicBlock } from './index'
import { Table, Button, Row, Col } from 'antd'
// import SearchBlock from './searchBlock'
import Pagination from './pagination'
import { CREATE } from '../../components/crudTemplate'
const TableBlock = () => {
  return (
    <LogicBlock.Consumer>
      {({ handleEvent, columns, dataSet, isUserLoggedIn }) => {
        return (
          <Row>
            <Col>{/* <SearchBlock /> */}</Col>
            <Col
              span={24}
              style={{ textAlign: 'right', zIndex: 8, marginBottom: '10px' }}
            >
              {isUserLoggedIn ? (
                <Button onClick={handleEvent.handleToggleModal(CREATE)}>
                  create
                </Button>
              ) : (
                ''
              )}
            </Col>
            <Table
              style={{ whiteSpace: 'nowrap' }}
              columns={columns}
              dataSource={dataSet}
            />
            <Pagination />
          </Row>
        )
      }}
    </LogicBlock.Consumer>
  )
}

export default TableBlock
