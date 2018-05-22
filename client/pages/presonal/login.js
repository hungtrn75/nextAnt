import React from 'react'
import LoginForm from '../../src/features/login/login'
import { GlobalBlock } from '../../src/components/layout'
import LogoutForm from '../../src/features/login/logout'
import withApollo from '../../src/lib/withApollo'

const Login = props => {
  return (
    <GlobalBlock.Consumer>
      {result => {
        if (!process.browser) {
          return <div />
        }
        const { loginState, handleLoginEvent } = result
        if (loginState.state.loggedIn === false) {
          return <LoginForm handleLogin={handleLoginEvent.handleLogin} />
        } else {
          return <LogoutForm handleLogout={handleLoginEvent.handleLogout} />
        }
      }}
    </GlobalBlock.Consumer>
  )
}

export default withApollo(Login)
