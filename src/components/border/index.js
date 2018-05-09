import React, { Component } from 'react'
//import GetData from './getData'
import Table from '../table'
import { Divider, Icon, Button, Modal } from 'antd'
import { BoardDelete, BoardAllQuery } from '../../graphql/board'
import { graphql, Query } from 'react-apollo';
import CreateModal from './create'
import DetailModal from './detail'
import UpdateModal from './update'

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showBlock: false, showDetail: false,
      showUpdate: false, chooseId: "",
      UpdateData: "", detailData: ""
    }
  }
  handleCreateToggle = () => {
    this.setState({ showBlock: !this.state.showBlock })
  }

  render() {
    console.log('t------------')
    console.log(this.props)
    const handleUpdate = (record) => {

      this.setState({ showUpdate: !this.state.showUpdate, UpdateData: record })

      //console.log('handleUpdate')
    }
    const handleDelete = (e) => {
      this.props._delete(e.data.BoardId)
      //console.log(e)

    }
    const handleDetailToggle = (record) => {
      //console.log('test')

      this.setState({ showDetail: !this.state.showDetail, detailData: record })
    }

    const handleUpdateToggle = () => {
      this.setState({ showUpdate: !this.state.showUpdate })
    }


    const columns = [{
      title: 'TiTle',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => <a href="#" onClick={() => handleDetailToggle({ data: record })}>{text}</a>,
    }, {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
    }, {
      title: 'StateDate',
      dataIndex: 'stateDate',
      key: 'stateData',
    }, {
      title: 'Function',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (text, record) => {

        return (<span>
          <Button onClick={() => handleUpdate({ data: record })}>Update</Button>
          <Divider type="vertical" />
          <Button onClick={() => handleDelete({ data: record })}>Delete</Button>
        </span>)
      },

    }];

    return (
      <div>
        <Query query={BoardAllQuery}>
          {
            ({ loading, error, data }) => {
              if (loading == true) { return <div>Loding</div> }
              if (error) return <div>Something Wrong</div>

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
                <DetailModal showBlock={this.state.showDetail} detailData={this.state.detailData} handleDetailToggle={handleDetailToggle} />
                <UpdateModal showBlock={this.state.showUpdate} updateData={this.state.UpdateData} handleUpdateToggle={handleUpdateToggle} />
                <Table columns={columns} data={dataX}></Table>
                <Button type="primary" onClick={() => this.handleCreateToggle()}>Create</Button>
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
      console.log(`DeleteData${BoardId}`)
      return await mutate({
        variables: { BoardId },
        refetchQueries: [{ query: BoardAllQuery }]
      })
    },
  })
})(Board)