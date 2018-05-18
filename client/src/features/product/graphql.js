import React from 'react'
import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'

export const productAllQuery = gql`
  query productAllQuery {
    productAllQuery {
      productId
      Title
      Content
    }
  }
`

export const productOneQuery = gql`
  query productOneQuery($productId: String) {
    productOneQuery(productId: $productId) {
      productId
      Title
      Content
    }
  }
`

export const productUpdate = gql`
  mutation productUpdate($Title: String, $Content: String, $productId: String) {
    productUpdate(Title: $Title, Content: $Content, productId: $productId) {
      productId
      Title
      Content
    }
  }
`

export const productDelete = gql`
  mutation productDelete($productId: String) {
    productDelete(productId: $productId) {
      productId
      Title
      Content
    }
  }
`

export const productAdd = gql`
  mutation productAdd($Title: String, $Content: String) {
    productAdd(Title: $Title, Content: $Content) {
      Title
      Content
      productId
    }
  }
`

const createCrud = ({ render }) => (
  <Mutation mutation={productAdd}>
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
