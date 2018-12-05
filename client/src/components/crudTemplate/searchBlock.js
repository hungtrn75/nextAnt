import React from 'react'

import { LogicBlock } from './index'

const SearchBlock = () => (
  <LogicBlock.Consumer>{({ SearchSet }) => <SearchSet />}</LogicBlock.Consumer>
)

export default SearchBlock
