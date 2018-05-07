import React, { Component } from 'react'
import GetData from './getData'
import Table from '../table'
import { Divider, Icon } from 'antd'







class Board extends Component {
  render() {
    const columns = [{
      title: '公告事項',
      dataIndex: 'title',
      key: 'title',
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: '公告內容',
      dataIndex: 'content',
      key: 'content',
    }, {
      title: '起始日期',
      dataIndex: 'stateDate',
      key: 'stateData',
    }, {
      title: '結束日期',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (text, record) => (
        <span>
          <a href="javascript:;">修改</a>
          <Divider type="vertical" />
          <a href="javascript:;">刪除</a>
        </span>
      ),
    }];

    return (
      <div>
        <GetData>
          {
            (result) => {
              if (result.data.loading == true) {
                return <div>Loding</div>
              }
              const data = result.data.BorderAllQuery.map((v, i) => {
                return { key: i, title: v.Title, content: v.Content, stateDate: 'test', endDate: 'test' }
              })
              return <div><Table columns={columns} data={data}></Table></div>
            }
          }
        </GetData>
      </div>
    )
  }
}

export default Board