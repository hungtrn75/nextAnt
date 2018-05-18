import React from 'react'
import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'

export const BoardAllQuery = gql`
  query BoardAllQuery {
    BoardAllQuery {
      BoardId
      Title
      Content
    }
  }
`
export const BoardOneQuery = gql`
  query BoardOneQuery($BoardId: String) {
    BoardOneQuery(BoardId: $BoardId) {
      BoardId
      Title
      Content
    }
  }
`

export const BoardUpdate = gql`
  mutation BoardUpdate($Title: String, $Content: String, $BoardId: String) {
    BoardUpdate(Title: $Title, Content: $Content, BoardId: $BoardId) {
      BoardId
      Title
      Content
    }
  }
`

export const BoardDelete = gql`
  mutation BoardDelete($BoardId: String) {
    BoardDelete(BoardId: $BoardId) {
      BoardId
      Title
      Content
    }
  }
`

export const BoardAdd = gql`
  mutation BoardAdd($Title: String, $Content: String) {
    BoardAdd(Title: $Title, Content: $Content) {
      Title
      Content
      BoardId
    }
  }
`

const createCrud = ({ render }) => (
  <Mutation mutation={BoardAdd}>
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
)

const updateCrud = ({ render }) => (
  <Mutation mutation={BoardUpdate}>
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
)

const deleteCrud = ({ render }) => (
  <Mutation mutation={BoardDelete}>
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
)

export const CrudContainer = adopt({
  query: <Query query={BoardAllQuery} />,
  createCrud,
  updateCrud,
  deleteCrud
})
