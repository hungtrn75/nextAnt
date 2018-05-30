import React from 'react'
import { LogicBlock } from './index'
import { Table, Button, Row, Col } from 'antd'
import { CREATE } from '../../components/crudTemplate'
export default () => {
  return (
    <LogicBlock.Consumer>
      {({ handleEvent, columns, dataSet, isUserLoggedIn }) => {
        return (
          <Row>
            <Col
              span={24}
              style={{ textAlign: 'right', zIndex: 9, marginBottom: '10px' }}
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
          </Row>
        )
      }}
    </LogicBlock.Consumer>
  )
}
