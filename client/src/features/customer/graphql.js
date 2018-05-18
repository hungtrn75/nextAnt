import React from 'react'
import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'

export const customerAllQuery = gql`
  query customerAllQuery {
    customerAllQuery {
      _id
      name
      tel
      cellphone
      memo
    }
  }
`

export const customerCreate = gql`
  mutation customerCreate(
    $name: String
    $tel: String
    $cellphone: String
    $memo: String
  ) {
    customerCreate(name: $name, tel: $tel, cellphone: $cellphone, memo: $memo) {
      _id
      name
      tel
      cellphone
      memo
    }
  }
`

export const customerUpdate = gql`
  mutation customerUpdate(
    $_id: String
    $name: String
    $tel: String
    $cellphone: String
    $memo: String
  ) {
    customerUpdate(
      _id: $_id
      name: $name
      tel: $tel
      cellphone: $cellphone
      memo: $memo
    ) {
      _id
    }
  }
`

export const customerDelete = gql`
  mutation customerDelete($_id: String) {
    customerDelete(_id: $_id) {
      _id
    }
  }
`

const createCrud = ({ render }) => (
  <Mutation mutation={customerCreate}>
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
)

const updateCrud = ({ render }) => (
  <Mutation mutation={customerUpdate}>
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
)

const deleteCrud = ({ render }) => (
  <Mutation mutation={customerDelete}>
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
)

export const CrudContainer = adopt({
  query: <Query query={customerAllQuery} />,
  createCrud,
  updateCrud,
  deleteCrud
})
