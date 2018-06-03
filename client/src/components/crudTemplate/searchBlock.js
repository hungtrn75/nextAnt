import React from 'react'
import { LogicBlock } from './index'

const SearchBlock = () => {
  return (
    <LogicBlock.Consumer>
      {({ SearchSet }) => {
        return <SearchSet />
      }}
    </LogicBlock.Consumer>
  )
}

export default SearchBlock
