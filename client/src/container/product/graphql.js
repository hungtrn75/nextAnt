import React from 'react'
import { Query, Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'
import {
  productAdd,
  productDelete,
  productUpdate,
  productAllQuery
} from '../../graphql/product'

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
