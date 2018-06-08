import React from 'react'
import TableBlock from './tableBlock'
import ModalBlock from './modalBlock'

export const CREATE = 'CREATE'
export const UPDATE = 'UPDATE'
export const DELETE = 'DELETE'
export const DETAIL = 'DETAIL'

export const LogicBlock = React.createContext()

const CrudTemplate = props => (
  <LogicBlock.Provider value={props}>
    <ModalBlock />
    <TableBlock />
  </LogicBlock.Provider>
)

export default CrudTemplate
