import React from 'react'
import { Query, Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'
import {
  userAdd,
  userDelete,
  userUpdate,
  userAllQuery
} from '../../graphql/user'

const createCrud = ({ render }) => (
  <Mutation mutation={userAdd}>
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
)
const updateCrud = ({ render }) => (
  <Mutation mutation={userUpdate}>
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
)
const deleteCrud = ({ render }) => (
  <Mutation mutation={userDelete}>
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
)
export const CrudContainer = adopt({
  query: <Query query={userAllQuery} />,
  createCrud,
  updateCrud,
  deleteCrud
})
