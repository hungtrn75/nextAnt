import React, { Component } from 'react'
import TableBlock from './tableBlock'
import SearchBlock from './searchBlock'
import ModalBlock from './modalBlock'

export const CREATE = 'CREATE'
export const UPDATE = 'UPDATE'
export const DELETE = 'DELETE'
export const DETAIL = 'DETAIL'

/**************
this template include search create update delete tablelist

logic also here 

*/

export const LogicBlock = React.createContext()

export default props => (
  <LogicBlock.Provider value={props}>
    <ModalBlock />
    <SearchBlock />
    <TableBlock />
  </LogicBlock.Provider>
)
