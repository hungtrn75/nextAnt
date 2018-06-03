import React from 'react'
import { LogicBlock } from './index'
import { Table, Button, Row, Col } from 'antd'

import Pagination from './pagination'
import { CREATE } from '../../components/crudTemplate'
import SearchBlock from './searchBlock'
export default () => {
  return (
    <LogicBlock.Consumer>
      {({ handleEvent, columns, dataSet, isUserLoggedIn }) => {
        return (
          <Row>
            <Col>
              <SearchBlock />
            </Col>
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
            <Table columns={columns} dataSource={dataSet} />
            <Pagination />
          </Row>
        )
      }}
    </LogicBlock.Consumer>
  )
}
