import React from 'react'
import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'
import PropTypes from 'prop-types'

export const productAllQuery = gql`
  query productAllQuery {
    productAllQuery {
      _id
      title
      content
      price
      hide
    }
  }
`

export const productOneQuery = gql`
  query productOneQuery($_id: String) {
    productOneQuery(_id: $_id) {
      _id
      title
      content
      price
      hide
    }
  }
`

export const productUpdate = gql`
  mutation productUpdate(
    $title: String
    $content: String
    $_id: String
    $price: String
    $hide: Boolean
  ) {
    productUpdate(
      title: $title
      content: $content
      _id: $_id
      price: $price
      hide: $hide
    ) {
      _id
      title
      content
      price
      hide
    }
  }
`

export const productDelete = gql`
  mutation productDelete($_id: String) {
    productDelete(_id: $_id) {
      _id
      title
      content
      price
      hide
    }
  }
`

export const productCreate = gql`
  mutation productCreate(
    $title: String
    $content: String
    $price: String
    $hide: Boolean
  ) {
    productCreate(
      title: $title
      content: $content
      price: $price
      hide: $hide
    ) {
      title
      content
      price
      _id
    }
  }
`

const createCrud = ({ render }) => (
  <Mutation mutation={productCreate}>
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
)

const updateCrud = ({ render }) => (
  <Mutation mutation={productUpdate}>
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
)

const deleteCrud = ({ render }) => (
  <Mutation mutation={productDelete}>
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
)

export const CrudContainer = adopt({
  query: <Query query={productAllQuery} />,
  createCrud,
  updateCrud,
  deleteCrud
})
createCrud.propTypes = {
  render: PropTypes.func
}
updateCrud.propTypes = {
  render: PropTypes.func
}

deleteCrud.propTypes = {
  render: PropTypes.func
}
