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
      title: 'TiTle',
      dataIndex: 'title',
      key: 'title',
      render: text => <Button onClick={() => handleDetailToggle()}>{text}</Button>,
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
          <Button onClick={() => handleChange()}>Update</Button>
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
                <DetailModal showBlock={this.state.showDetail} handleDetailToggle={handleDetailToggle} />
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