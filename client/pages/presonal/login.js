import React from 'react'
import LoginForm from '../../src/features/login'
import { GlobalBlock } from '../../src/components/layout'

export default () => {
  return (
    <GlobalBlock.Consumer>
      {result => {
        console.log(result)
        return <LoginForm />
      }}
    </GlobalBlock.Consumer>
  )
}
