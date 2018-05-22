import React from 'react'
import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'

export const userAllQuery = gql`
  query userAllQuery {
    userAllQuery {
      id
      email
      password
    }
  }
`

// export const userUpdate = gql`
//   mutation userUpdate(    $_id: String    $email: String    $password: String
//   ) {
//     userUpdate(      _id: $_id      email: $email      password: $password
//     ) {
//       _id
//       email
//       password
//     }
//   }
// `

export const userDelete = gql`
  mutation userDelete($_id: String) {
    userDelete(_id: $_id) {
      _id
    }
  }
`

// export const userCreate = gql`
//   mutation userCreate(
//     $email: String
//     $password: String
//   ) {
//     userCreate(
//       email: $email
//       password: $password
//     ) {
//       _id
//       email
//       password
//     }
//   }
// `

// const createCrud = ({ render }) => (
//   <Mutation mutation={userCreate}>
//     {(mutation, result) => render({ mutation, result })}
//   </Mutation>
// )

const deleteCrud = ({ render }) => (
  <Mutation mutation={userDelete}>
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
)
export const CrudContainer = adopt({
  query: <Query query={userAllQuery} />,
  deleteCrud
})
