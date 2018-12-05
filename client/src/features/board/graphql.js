import React from 'react'
import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'
import PropTypes from 'prop-types'

export const boardAllQuery = gql`
  query boardAllQuery {
    boardAllQuery {
      _id
      title
      content
      startDate
      endDate
    }
    boardQueryTotal {
      totalCount
    }
  }
`

export const boardQueryPage = gql`
  query boardQueryPage(
    $page: Int
    $size: Int
    $title: String
    $content: String
  ) {
    boardQueryPage(page: $page, size: $size, title: $title, content: $content) {
      _id
      title
      content
      startDate
      endDate
    }
    boardQueryTotal(title: $title, content: $content) {
      totalCount
    }
  }
`

export const boardOneQuery = gql`
  query boardOneQuery($_id: String) {
    boardOneQuery(_id: $_id) {
      _id
      title
      content
      startDate
      endDate
    }
  }
`

export const boardUpdate = gql`
  mutation boardUpdate(
    $title: String
    $content: String
    $_id: String
    $startDate: Date
    $endDate: Date
  ) {
    boardUpdate(
      title: $title
      content: $content
      _id: $_id
      startDate: $startDate
      endDate: $endDate
    ) {
      _id
      title
      content
      startDate
      endDate
    }
  }
`

export const boardDelete = gql`
  mutation boardDelete($_id: String) {
    boardDelete(_id: $_id) {
      totalCount
    }
  }
`

export const boardCreate = gql`
  mutation boardCreate(
    $title: String
    $content: String
    $startDate: Date
    $endDate: Date
  ) {
    boardCreate(
      title: $title
      content: $content
      startDate: $startDate
      endDate: $endDate
    ) {
      totalCount
    }
  }
`

const createCrud = ({ render }) => (
  <Mutation mutation={boardCreate} fetchPolicy="cache-and-network">
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
)

// update={(cache, { data: { createTodo } }) => {
//   const query = ALL_TODOS
//   const { todos } = cache.readQuery({ query })

//   cache.writeQuery({
//     query,
//     data: { todos: R.concat(todos, [createTodo]) },
//   })
// }}

const updateCrud = ({ render }) => (
  <Mutation mutation={boardUpdate} fetchPolicy="cache-and-network">
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
)

const deleteCrud = ({ render }) => (
  <Mutation mutation={boardDelete} fetchPolicy="cache-and-network">
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
)

export const CrudContainer = adopt({
  query: (
    <Query
      query={boardQueryPage}
      variables={{ page: 1, size: 10 }}
      fetchPolicy="network-only"
    />
  ),
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
