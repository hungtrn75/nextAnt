import React from 'react'
import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'

export const boardAllQuery = gql`
  query boardAllQuery {
    boardAllQuery {
      _id
      title
      content
    }
  }
`
export const boardOneQuery = gql`
  query boardOneQuery($_id: String) {
    boardOneQuery(_id: $_id) {
      _id
      title
      content
    }
  }
`

export const boardUpdate = gql`
  mutation boardUpdate($title: String, $content: String, $_id: String) {
    boardUpdate(title: $title, content: $content, _id: $_id) {
      _id
      title
      content
    }
  }
`

export const boardDelete = gql`
  mutation boardDelete($_id: String) {
    boardDelete(_id: $_id) {
      _id
      title
      content
    }
  }
`

export const boardCreate = gql`
  mutation boardCreate($title: String, $content: String) {
    boardCreate(title: $title, content: $content) {
      title
      content
      _id
    }
  }
`

const createCrud = ({ render }) => (
  <Mutation mutation={boardCreate}>
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
)

const updateCrud = ({ render }) => (
  <Mutation mutation={boardUpdate}>
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
)

const deleteCrud = ({ render }) => (
  <Mutation mutation={boardDelete}>
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
)

export const CrudContainer = adopt({
  query: <Query query={boardAllQuery} />,
  createCrud,
  updateCrud,
  deleteCrud
})
