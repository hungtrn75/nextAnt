import React from 'react'
import { adopt } from 'react-adopt'
import { Toggle, Value } from 'react-powerplug'
import { Button, Divider } from 'antd'

import CrudTemplate, {
  CREATE,
  UPDATE,
  DETAIL
} from '../../components/crudTemplate'
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
  isCreateButton: <Value initial={'false'} />
})

export default () => (
  <AdoptContainer>
    {//({ container, toggleModel, state }) => {
    result => {
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
      const CreateForm = () => {
        return <Form handleEvent={handleEvent} actionText={'create'} />
      }
      const DetailForm = () => {
        return <Form handleEvent={handleEvent} actionText={'detail'} />
      }
      const UpdateForm = () => {
        return <Form handleEvent={handleEvent} actionText={'update'} />
      }

      let TempForm = DetailForm

      const handleEvent = {
        handleToggleModal: (action, record) => {
          toggleModal.toggle()
          switch (action) {
            case DETAIL:
              recordChoose.setValue(record)
              assignForm.setValue('detail')
              break
          }
        },
        handleDelete: record => {
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
            <a
              href="#"
              onClick={() => handleEvent.handleToggleModal(DETAIL, record)}
            >
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
                <Button onClick={() => handleEvent.handleDelete(record)}>
                  Delete
                </Button>
              </span>
            )
          }
        }
      ]
      if (loading) {
        return <div>Logining</div>
      }

      const dataSet = data[queryName].map((v, i) => {
        return {
          key: i,
          _id: v._id,
          email: v.email
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
