import React, { Component } from 'react'
//import GetData from './getData'
import Table from '../table'
import { Divider, Icon, Button, Modal } from 'antd'
import { BoardDelete, BoardAllQuery } from '../../graphql/board'
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
      //console.log('handleChange')
    }
    const handleDelete = (e) => {
      this.props._delete(e.data.BoardId)
      //console.log(e)

    }
    const handleDetailToggle = () => {
      //console.log('test')
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
      title: '功能',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (text, record) => {

        return (<span>
          <Button onClick={() => handleChange()}>修改</Button>
          <Divider type="vertical" />
          <Button onClick={() => handleDelete({ data: record })}>刪除</Button>
        </span>)
      },

    }];

    return (
      <div>
        <Query query={BoardAllQuery}>
          {
            ({ loading, error, data }) => {
              if (loading == true) { return <div>Loding</div> }
              if (error) return <div>有錯誤歐</div>

              const dataX = data.BoardAllQuery.map((v, i) => {
                return {
                  key: i, title: v.Title,
                  content: v.Content,
                  stateDate: 'test', endDate: 'test',
                  BoardId: v.BoardId
                }
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

export default graphql(BoardDelete, {
  props: ({ mutate }) => ({
    _delete: async (BoardId) => {
      console.log(`刪除資料嚕${BoardId}`)
      return await mutate({
        variables: { BoardId },
        refetchQueries: [{ query: BoardAllQuery }]
      })
    },
  })
})(Board)