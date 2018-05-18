import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import { Button, Divider, Table as AntTable } from 'antd'

import { customerAllQuery, customerDelete } from '../../graphql/customer'
import CreateCustomer from './create'
import UpdateCustomer from './update'

const Table = props => (
  <AntTable columns={props.columns} dataSource={props.data} />
)

class Customer extends Component {
  state = {
    showCreate: false,
    showUpdate: false,
    updateData: {}
  }

  toggleCreate = () =>
    this.setState(({ showCreate }) => ({ showCreate: !showCreate }))

  toggleUpdate = () =>
    this.setState(({ showUpdate }) => ({ showUpdate: !showUpdate }))

  handleUpdate = data => () => {
    this.setState(() => ({ updateData: data }), () => this.toggleUpdate())
  }

  render() {
    const { showCreate, showUpdate, updateData } = this.state

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'TEL',
        dataIndex: 'tel',
        key: 'tel'
      },
      {
        title: 'Cellphone',
        dataIndex: 'cellphone',
        key: 'cellphone'
      },
      {
        title: 'Memo',
        dataIndex: 'memo',
        key: 'memo'
      },
      {
        title: 'Function',
        dataIndex: 'function',
        key: 'function',
        render: (text, record) => (
          <Mutation mutation={customerDelete}>
            {(customerDelete, { data }, loading) => (
              <span>
                <Button onClick={this.handleUpdate(record)}>Update</Button>
                <Divider type="vertical" />
                <Button
                  onClick={() =>
                    customerDelete({
                      variables: { _id: record._id },
                      refetchQueries: [{ query: customerAllQuery }]
                    })
                  }
                >
                  Delete
                </Button>
              </span>
            )}
          </Mutation>
        )
      }
    ]

    return (
      <Query query={customerAllQuery}>
        {({ loading, error, data }) => {
          if (loading === true) return <div>Loding</div>

          if (error) return <div>Something Wrong</div>

          const dataX = data.customerAllQuery.map(
            ({ _id, name, tel, cellphone, memo }) => ({
              key: _id,
              _id,
              name,
              tel,
              cellphone,
              memo
            })
          )

          return (
            <div>
              <CreateCustomer
                showCreate={showCreate}
                toggleCreate={this.toggleCreate}
              />
              <UpdateCustomer
                showUpdate={showUpdate}
                toggleUpdate={this.toggleUpdate}
                updateData={updateData}
              />
              <Table columns={columns} data={dataX} />
              <Button type="primary" onClick={this.toggleCreate}>
                Create
              </Button>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default Customer
