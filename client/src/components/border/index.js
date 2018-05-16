import React, { Component } from 'react'
import TableSetup from './tableSetup'
import { Divider, Icon, Button, Modal } from 'antd'
import { CrudContainer } from './grpahql'
import { BoardAllQuery } from '../../graphql/board'

export const CrudContext = React.createContext('')

class Board extends Component {
  state = {
    showModal: false,
    record: {}
  }
  render() {
    return (
      <CrudContainer>
        {result => {
          result.modal = {}
          result.modal.showModal = this.state.showModal
          result.modal.action = this.state.action
          result.modal.record = this.state.record
          result.modal.handleToggleModal = (action, record = {}) => {
            if (this.state.showModal) {
              record = {}
              action = ''
            }
            this.setState({
              showModal: !this.state.showModal,
              action,
              record
            })
          }
          result.modal.handleDelete = async data => {
            let values = { BoardId: data.record.BoardId }
            await result.deleteCrud.mutation({
              variables: values,
              refetchQueries: [{ query: BoardAllQuery }]
            })
          }
          result.modal.handleSubmit = resultX => {
            resultX.e.preventDefault()
            resultX.form.validateFields(async (err, values) => {
              if (!err) {
                if (this.state.action === 'update') {
                  values.BoardId = this.state.record.record.BoardId
                  await result.updateCrud.mutation({
                    variables: values,
                    refetchQueries: [{ query: BoardAllQuery }]
                  })
                  this.setState({ action: '', record: {}, showModal: false })
                  resultX.form.resetFields()
                }
                if (this.state.action === 'create') {
                  await result.createCrud.mutation({
                    variables: values,
                    refetchQueries: [{ query: BoardAllQuery }]
                  })
                  this.setState({ action: '', record: {}, showModal: false })
                  resultX.form.resetFields()
                }
              }
            })
          }
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
