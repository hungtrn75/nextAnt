import gql from 'graphql-tag'

export const CustomerAllQuery = gql`
  query CustomerAllQuery {
    CustomerAllQuery {
      _id
      name
      tel
      cellphone
      memo
    }
  }
`
