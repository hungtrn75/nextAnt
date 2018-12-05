import React from 'react'
import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'
import PropTypes from 'prop-types'

export const login = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      email
      picture
    }
  }
`
export const userAllQuery = gql`
  query userAllQuery {
    userAllQuery {
      _id
      email
    }
  }
`

export const signup = gql`
  mutation signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      _id
      email
      picture
    }
  }
`

export const logout = gql`
  mutation logout {
    logout {
      token
    }
  }
`

export const userPorfile = gql`
  query profile {
    profile {
      email
      picture
    }
  }
`

export const isUserLoggedIn = gql`
  query isUserLoggedIn {
    isUserLoggedIn
  }
`

export const checkUser = () => <Query query={isUserLoggedIn} />

export const loginAction = ({ render }) => (
  <Mutation mutation={login}>
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
)

export const signupAction = ({ render }) => (
  <Mutation mutation={signup}>
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
)

export const logoutAction = ({ render }) => (
  <Mutation mutation={logout}>
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
)
loginAction.propTypes = {
  render: PropTypes.func
}
signupAction.propTypes = {
  render: PropTypes.func
}
logoutAction.propTypes = {
  render: PropTypes.func
}

export const ActionContainer = adopt({
  signupAction,
  loginAction,
  logoutAction
})
