import gql from 'graphql-tag'

export const productAllQuery = gql`
  query productAllQuery {
    productAllQuery {
      productId
      Title
      Content
    }
  }
`
export const productOneQuery = gql`
  query productOneQuery($productId: String) {
    productOneQuery(productId: $productId) {
      productId
      Title
      Content
    }
  }
`

export const productUpdate = gql`
  mutation productUpdate($Title: String, $Content: String, $productId: String) {
    productUpdate(Title: $Title, Content: $Content, productId: $productId) {
      productId
      Title
      Content
    }
  }
`

export const productDelete = gql`
  mutation productDelete($productId: String) {
    productDelete(productId: $productId) {
      productId
      Title
      Content
    }
  }
`

export const productAdd = gql`
  mutation productAdd($Title: String, $Content: String) {
    productAdd(Title: $Title, Content: $Content) {
      Title
      Content
      productId
    }
  }
`
