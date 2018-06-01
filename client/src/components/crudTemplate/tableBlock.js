import React from 'react'
import { LogicBlock } from './index'
import { Table, Button, Row, Col, Pagination } from 'antd'
import { CREATE } from '../../components/crudTemplate'
export default () => {
  return (
    <LogicBlock.Consumer>
      {({
        handleEvent,
        columns,
        dataSet,
        pageInfo,
        handleChangePage,
        result: { isCreateButton }
      }) => {
        console.log('pageInfoxx', pageInfo)
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
            <Pagination
              pageSize={pageInfo.state.pageSize}
              defaultCurrent={pageInfo.state.nowPage}
              total={pageInfo.state.pageTotal}
              onChange={handleChangePage}
            />
          </Row>
        )
      }}
    </LogicBlock.Consumer>
  )
}
