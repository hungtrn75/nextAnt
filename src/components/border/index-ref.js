import React, { Component } from 'react'
import { adopt } from 'react-adopt'
import { Toggle } from 'react-powerplug'

import TableSetup from './tableSetup'
import { CrudContainer } from './grpahql'
import { BoardAllQuery } from '../../graphql/board'

export const CrudContext = React.createContext('')

const C = adopt({
  container: <CrudContainer />,
  toggleModel: <Toggle initial={false} />
})

class Board extends Component {
  state = {
    record: {}
  }

  render() {
    return (
      <C>
        {({ container, toggleModel }) => {
          container.modal = {}

          container.modal.showModal = toggleModel.on
          container.modal.action = this.state.action
          container.modal.record = this.state.record

          container.modal.handleToggleModal = (action, record = {}) => {
            {
              /* if (this.state.showModal) {
              record = {}
              action = ''
            }
            this.setState({
              action,
              record
            }) */
            }
            toggleModel.toggle()
          }

          container.modal.handleDelete = async data => {
            let values = { BoardId: data.record.BoardId }
            await container.deleteCrud.mutation({
              variables: values,
              refetchQueries: [{ query: BoardAllQuery }]
            })
          }

          container.modal.handleSubmit = resultX => {
            resultX.e.preventDefault()
            resultX.form.validateFields(async (err, values) => {
              if (!err) {
                if (this.state.action === 'update') {
                  values.BoardId = this.state.record.record.BoardId
                  await container.updateCrud.mutation({
                    variables: values,
                    refetchQueries: [{ query: BoardAllQuery }]
                  })
                  this.setState({ action: '', record: {} })
                  resultX.form.resetFields()
                  toggleModel.toggle()
                }
                if (this.state.action === 'create') {
                  await container.createCrud.mutation({
                    variables: values,
                    refetchQueries: [{ query: BoardAllQuery }]
                  })
                  this.setState({ action: '', record: {} })
                  resultX.form.resetFields()
                  toggleModel.toggle()
                }
              }
            })
          }

          return (
            <CrudContext.Provider value={container}>
              <TableSetup />
            </CrudContext.Provider>
          )
        }}
      </C>
    )
  }
}

export default Board
