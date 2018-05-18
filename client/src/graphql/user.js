import gql from 'graphql-tag'

export const userAllQuery = gql`
  query userAllQuery {
    userAllQuery {
      userId
      name
      tel
      nickName
      account
      password
    }
  }
`
export const userOneQuery = gql`
  query userOneQuery($userId: String) {
    userOneQuery(userId: $userId) {
      userId
      name
      tel
      nickName
      account
      password
    }
  }
`

export const userUpdate = gql`
  mutation userUpdate(
    $userId: String
    $name: String
    $nickName: String
    $tel: String
    $account: String
    $password: String
  ) {
    userUpdate(
      userId: $userId
      name: $name
      nickName: $nickName
      tel: $tel
      account: $account
      password: $password
    ) {
      userId
      name
      tel
      nickName
      account
      password
    }
  }
`

export const userDelete = gql`
  mutation userDelete($userId: String) {
    userDelete(userId: $userId) {
      userId
      name
      tel
      nickName
      account
      password
    }
  }
`

export const userAdd = gql`
  mutation userAdd(
    $name: String
    $nickName: String
    $tel: String
    $account: String
    $password: String
  ) {
    userAdd(
      name: $name
      nickName: $nickName
      tel: $tel
      account: $account
      password: $password
    ) {
      userId
      name
      tel
      nickName
      account
      password
    }
  }
`
