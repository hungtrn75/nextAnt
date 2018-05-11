import React, { Component } from 'react'
import { graphql, Query } from 'react-apollo'

import Table from '../table'
import { CustomerAllQuery } from '../../graphql/customer'

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

const Customer = () => (
  <Query query={CustomerAllQuery}>
    {({ loading, error, data }) => {
      if (loading === true) return <div>Loding</div>

      if (error) return <div>Something Wrong</div>

      const dataX = data.CustomerAllQuery.map(
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
          <Table columns={columns} data={dataX} />
        </div>
      )
    }}
  </Query>
)

export default Customer
