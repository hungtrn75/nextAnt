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

export const customerCreate = gql`
  mutation customerCreate(
    $name: String
    $tel: String
    $cellphone: String
    $memo: String
  ) {
    customerCreate(name: $name, tel: $tel, cellphone: $cellphone, memo: $memo) {
      _id
      name
      tel
      cellphone
      memo
    }
  }
`

export const customerUpdate = gql`
  mutation customerUpdate(
    $_id: String
    $name: String
    $tel: String
    $cellphone: String
    $memo: String
  ) {
    customerUpdate(
      _id: $_id
      name: $name
      tel: $tel
      cellphone: $cellphone
      memo: $memo
    ) {
      _id
    }
  }
`
