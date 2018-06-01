import React from 'react'
import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'

export const userAllQuery = gql`
  query userAllQuery {
    userAllQuery {
      _id
      email
    }
  }
`

export const userDelete = gql`
  mutation userDelete($_id: String!) {
    userDelete(_id: $_id) {
      _id
    }
  }
`

const deleteCrud = ({ render }) => (
  <Mutation mutation={userDelete}>
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
)

export const CrudContainer = adopt({
  query: <Query query={userAllQuery} />,
  deleteCrud
})
