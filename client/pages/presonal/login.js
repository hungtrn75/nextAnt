import React from 'react'

import LoginForm from '../../src/features/auth/login'
import { GlobalBlock } from '../../src/components/layout'
import LogoutForm from '../../src/features/auth/logout'

const Login = () => (
  <GlobalBlock.Consumer>
    {result => {
      if (!process.browser) {
        return <div />
      }

      const { loginState } = result

      if (!!loginState.state.loginUser) {
        return <LogoutForm />
      } else {
        return <LoginForm />
      }
    }}
  </GlobalBlock.Consumer>
)

export default Login
