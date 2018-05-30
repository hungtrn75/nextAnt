import React from 'react'
import { adopt } from 'react-adopt'
import { Toggle, Value } from 'react-powerplug'
import { Button } from 'antd'

import CrudTemplate, { DETAIL } from '../../components/crudTemplate'
import { CrudContainer, userAllQuery } from './graphql'

import Form from './form'

const AdoptContainer = adopt({
  container: <CrudContainer />,
  toggleModal: <Toggle initial={false} />,
  modal: <Value initial={{ title: ' test' }} />,
  crudInfo: <Value initial={{ queryName: 'userAllQuery' }} />,
  formData: <Value initial={{ formData: {} }} />,
  assignForm: <Value initial={'create'} />,
  recordChoose: <Value initial={''} />,
  isCreateButton: <Value initial={'false'} />,
  formName: <Value initial={'User'} />
})

export default () => (
  <AdoptContainer>
    {result => {
      const {
        assignForm,
        toggleModal,
        recordChoose,
        container: {
          query: { data, loading, error }
        },
        crudInfo: {
          value: { queryName }
        }
      } = result
      if (error) {
        return <div>Opps something wrong</div>
      }

      const handleEvent = {
        handleToggleModal: () => (action, record) => {
          toggleModal.toggle()
          switch (action) {
            case DETAIL:
              recordChoose.setValue(record)
              assignForm.setValue('detail')
              break
          }
        },
        handleDelete: record => () => {
          let values = { _id: record._id }

          result.container.deleteCrud.mutation({
            variables: values,
            refetchQueries: [{ query: userAllQuery }]
          })
        }
      }

      const columns = [
        {
          title: 'email',
          dataIndex: 'email',
          key: 'email',
          render: (text, record) => (
            <a href="#" onClick={handleEvent.handleToggleModal(DETAIL, record)}>
              {text}
            </a>
          )
        },

        {
          title: 'Function',
          dataIndex: 'endDate',
          key: 'endDate',
          render: (text, record) => {
            return (
              <span>
                <Button onClick={handleEvent.handleDelete(record)}>
                  Delete
                </Button>
              </span>
            )
          }
        }
      ]

      const DetailForm = () => {
        return <Form handleEvent={handleEvent} actionText={'detail'} />
      }
      if (loading) {
        return <div>Logining</div>
      }

      const dataSet = data[queryName].map(({ _id, email }) => {
        return {
          key: _id,
          _id: _id,
          email: email
        }
      })

      return (
        <CrudTemplate
          handleEvent={handleEvent}
          columns={columns}
          dataSet={dataSet}
          result={result}
          DetailForm={DetailForm}
        />
      )
    }}
  </AdoptContainer>
)
