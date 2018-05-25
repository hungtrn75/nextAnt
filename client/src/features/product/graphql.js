import React from 'react'
import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'

export const productAllQuery = gql`
  query productAllQuery {
    productAllQuery {
      _id
      title
      content
    }
  }
`

export const productOneQuery = gql`
  query productOneQuery($_id: String) {
    productOneQuery(_id: $_id) {
      _id
      title
      content
    }
  }
`

export const productUpdate = gql`
  mutation productUpdate($title: String, $content: String, $_id: String) {
    productUpdate(title: $title, content: $content, _id: $_id) {
      _id
      title
      content
    }
  }
`

export const productDelete = gql`
  mutation productDelete($_id: String) {
    productDelete(_id: $_id) {
      _id
      title
      content
    }
  }
`

export const productCreate = gql`
  mutation productCreate($title: String, $content: String) {
    productCreate(title: $title, content: $content) {
      title
      content
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
