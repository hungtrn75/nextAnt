import { gql } from 'apollo-boost'

export const BoardAllQuery = gql`
  query BoardAllQuery {
    BoardAllQuery {
      BoardId
      Title
      Content
    }
  }
`
export const BoardOneQuery = gql`
  query BoardOneQuery($BoardId: String) {
    BoardOneQuery(BoardId: $BoardId) {
      BoardId
      Title
      Content
    }
  }
`

export const BoardUpdate = gql`
  mutation BoardUpdate($Title: String, $Content: String, $BoardId: String) {
    BoardUpdate(Title: $Title, Content: $Content, BoardId: $BoardId) {
      BoardId
      Title
      Content
    }
  }
`

export const BoardDelete = gql`
  mutation BoardDelete($BoardId: String) {
    BoardDelete(BoardId: $BoardId) {
      BoardId
      Title
      Content
    }
  }
`

export const BoardAdd = gql`
  mutation BoardAdd($Title: String, $Content: String) {
    BoardAdd(Title: $Title, Content: $Content) {
      Title
      Content
      BoardId
    }
  }
`
