import React, { Component } from 'react'
import { graphql, Query } from 'react-apollo'
import { Modal, Button } from 'antd'

import Table from '../table'
import { customerAllQuery } from '../../graphql/customer'
import CreateCustomer from './create-customer'

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
  }
]

class Customer extends Component {
  state = {
    showCreate: false
  }

  toggleCreate = () =>
    this.setState(({ showCreate }) => ({ showCreate: !showCreate }))

  render() {
    const { showCreate } = this.state

    return (
      <Query query={customerAllQuery}>
        {({ loading, error, data }) => {
          if (loading === true) return <div>Loding</div>

          if (error) return <div>Something Wrong</div>

          const dataX = data.customerAllQuery.map(
            ({ _id, name, tel, cellphone, memo }) => ({
              key: _id,
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
