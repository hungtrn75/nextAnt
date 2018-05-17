import React from 'react'
import { Query, Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'
import {
  BoardAdd,
  BoardDelete,
  BoardUpdate,
  BoardAllQuery
} from '../../graphql/board'

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
