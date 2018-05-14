import React, { Component } from 'react'
import TableSetup from './tableSetup'
import { Divider, Icon, Button, Modal } from 'antd'
import { CrudContainer } from './grpahql'

export const CrudContext = React.createContext('')

class Board extends Component {
  state = {
    showModal: false,
    data: ''
  }
  render() {
    return (
      <CrudContainer>
        {result => {
          result.modal = {}
          result.modal.showModal = this.state.showModal
          result.modal.action = this.state.action
          result.modal.handleToggleModal = (action, data) => {
            this.setState({
              showModal: !this.state.showModal,
              action,
              data
            })
          }
          result.modal.handleDelete = data => {
            console.log('delete')
          }
          result.modal.handleSubmit = e => {
            e.preventDefault()

            console.log('submit')
          }
          //console.log(result)
          return (
            <CrudContext.Provider value={result}>
              <TableSetup />
            </CrudContext.Provider>
          )
        }}
      </CrudContainer>
    )
  }
}

export default Board
