import React, { Component } from 'react'
import { Table, Divider, Button } from 'antd'
import { CrudContext } from './index'
import ModalSetup from './modalSetup'

class TableSetup extends Component {
  render() {
    return (
      <CrudContext.Consumer>
        {({ query, modal }) => {
          const dataX = query.data.BoardAllQuery.map((v, i) => {
            return {
              key: i,
              title: v.Title,
              content: v.Content,
              stateDate: 'test',
              endDate: 'test',
              BoardId: v.BoardId
            }
          })
          const columns = [
            {
              title: 'TiTle',
              dataIndex: 'title',
              key: 'title',
              render: (text, record) => (
                <a
                  href="#"
                  onClick={() =>
                    modal.handleToggleModal('detail', { data: record })
                  }
                >
                  {' '}
                  {text}{' '}
                </a>
              )
            },
            {
              title: 'Content',
              dataIndex: 'content',
              key: 'content'
            },
            {
              title: 'StateDate',
              dataIndex: 'stateDate',
              key: 'stateData'
            },
            {
              title: 'Function',
              dataIndex: 'endDate',
              key: 'endDate',
              render: (text, record) => {
                return (
                  <span>
                    <Button
                      onClick={() =>
                        modal.handleToggleModal('update', { record })
                      }
                    >
                      Update
                    </Button>
                    <Divider type="vertical" />
                    <Button onClick={() => modal.handleDelete({ record })}>
                      Delete
                    </Button>
                  </span>
                )
              }
            }
          ]

          return (
            <div>
              <ModalSetup />
              <Table columns={columns} dataSource={dataX} />
              <Button onClick={() => modal.handleToggleModal('create')}>
                Create
              </Button>
            </div>
          )
        }}
      </CrudContext.Consumer>
    )
  }
}

export default TableSetup
