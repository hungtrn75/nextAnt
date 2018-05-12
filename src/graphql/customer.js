import gql from 'graphql-tag'

export const customerAllQuery = gql`
  query customerAllQuery {
    customerAllQuery {
      _id
      name
      tel
      cellphone
      memo
    }
  }
`

export const customerAdd = gql`
  mutation customerAdd(
    $name: String
    $tel: String
    $cellphone: String
    $memo: String
  ) {
    customerAdd(name: $name, tel: $tel, cellphone: $cellphone, memo: $memo) {
      _id
      name
      tel
      cellphone
      memo
    }
  }
`
