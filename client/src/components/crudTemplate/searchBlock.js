import React from 'react'
import { LogicBlock } from './index'

const SearchBlock = () => {
  return (
    <LogicBlock.Consumer>
      {() => {
        return <div>search</div>
      }}
    </LogicBlock.Consumer>
  )
}

export default SearchBlock
