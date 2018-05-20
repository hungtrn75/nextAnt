import React from 'react'
import LoginForm from '../../src/features/login'
import { GlobalBlock } from '../../src/components/layout'
import LogoutForm from '../../src/features/logout'

export default props => {
  return (
    <GlobalBlock.Consumer>
      {result => {
        if (!process.browser) {
          return <div />
        }
        const { loginState, loginInfo, handleLoginEvent } = result
        console.log(handleLoginEvent)
        console.log(loginState.state.loginState)
        if (loginState.state.loginState === false) {
          return <LoginForm handleLogin={handleLoginEvent.handleLogin} />
        } else {
          return <LogoutForm handleLogout={handleLoginEvent.handleLogout} />
        }
      }}
    </GlobalBlock.Consumer>
  )
}
