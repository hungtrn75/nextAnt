import React, { Component } from 'react'
//import GetData from './getData'
import Table from '../table'
import { Divider, Icon, Button, Modal } from 'antd'
import { BorderDelete, BorderAllQuery } from '../../graphql/border'
import { graphql, Query } from 'react-apollo';
import CreateModal from './create'
import DetailModal from './detail'

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = { showBlock: false, showDetail: false }
  }
  handleCreateToggle = () => {
    this.setState({ showBlock: !this.state.showBlock })
  }

  render() {
    const handleChange = () => {
      console.log('handleChange')
    }
    const handleDelete = (e) => {
      console.log(e)

    }
    const handleDetailToggle = () => {
      console.log('test')
      this.setState({ showDetail: !this.state.showDetail })
    }

    const columns = [{
      title: '公告事項',
      dataIndex: 'title',
      key: 'title',
      render: text => <Button onClick={() => handleDetailToggle()}>{text}</Button>,
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
          <Button onClick={() => handleChange()}>修改</Button>
          <Divider type="vertical" />
          <Button onClick={(record) => handleDelete(record)}>刪除</Button>
        </span>
      ),

    }];

    return (
      <div>
        <Query query={BorderAllQuery}>
          {
            ({ loading, error, data }) => {
              if (loading == true) { return <div>Loding</div> }
              if (error) return <div>有錯誤歐</div>
              const dataX = data.BorderAllQuery.map((v, i) => {
                return { key: i, title: v.Title, content: v.Content, stateDate: 'test', endDate: 'test' }
              })
              return <div>
                <CreateModal showBlock={this.state.showBlock} handleCreateToggle={this.handleCreateToggle} />
                <DetailModal showBlock={this.state.showDetail} handleDetailToggle={handleDetailToggle} />
                <Table columns={columns} data={dataX}></Table>
                <Button type="primary" onClick={() => this.handleCreateToggle()}>新增</Button>
              </div>

            }
          }
        </Query>
      </div>
    )
  }
}

export default graphql(BorderDelete, {
  props: ({ mutate }) => ({
    _delete: async (borderId) => {
      console.log(`刪除資料嚕${borderId}`)
      return await mutate({
        variables: { borderId },
        refetchQueries: [{ query: BorderAllQuery }]
      })
    },

  })
})(Board)