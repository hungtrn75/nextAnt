import React from 'react'
import { LogicBlock } from './index'

export default () => {
  return (
    <LogicBlock.Consumer>
      {({ SearchSet }) => {
        return <SearchSet />
      }}
    </LogicBlock.Consumer>
  )
}
