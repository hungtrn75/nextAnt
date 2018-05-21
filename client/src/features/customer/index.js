import React from 'react'
import { adopt } from 'react-adopt'
import { Toggle, Value } from 'react-powerplug'
import { Button, Divider } from 'antd'

import CrudTemplate, {
  CREATE,
  UPDATE,
  DETAIL
} from '../../components/crudTemplate'
import Form from './form'
import { CrudContainer, customerAllQuery } from './graphql'

const AdoptContainer = adopt({
  container: <CrudContainer />,
  toggleModal: <Toggle initial={false} />,
  modal: <Value initial={{ title: ' test' }} />,
  crudInfo: <Value initial={{ queryName: 'customerAllQuery' }} />,
  formData: <Value initial={{ formData: {} }} />,
  assignForm: <Value initial={'create'} />,
  recordChoose: <Value initial={''} />
})

export default () => {
  return (
    <AdoptContainer>
      {//({ container, toggleModel, state }) => {
      result => {
        const {
          assignForm,
          toggleModal,
          recordChoose,
          container: {
            query: { data, loading }
          },
          crudInfo: {
            value: { queryName }
          }
        } = result

        const handleEvent = {
          handleToggleModal: (action, record) => {
            toggleModal.toggle()
            switch (action) {
              case DETAIL:
                recordChoose.setValue(record)
                assignForm.setValue('detail')
                break
              case UPDATE:
                assignForm.setValue('update')
                recordChoose.setValue(record)
                break
              case CREATE:
                assignForm.setValue('create')
                recordChoose.setValue('')
                break
            }
          },

          handleDelete: record => {
            let values = { _id: record._id }
            result.container.deleteCrud.mutation({
              variables: values,
              refetchQueries: [{ query: customerAllQuery }]
            })
          },

          handleSubmit: resultX => {
            resultX.e.preventDefault()
            resultX.form.validateFields(async (err, values) => {
              if (!err) {
                toggleModal.toggle()
                recordChoose.setValue(values)

                if (assignForm.value === 'update') {
                  values._id = recordChoose.value._id
                  await result.container.updateCrud.mutation({
                    variables: values,
                    refetchQueries: [{ query: customerAllQuery }]
                  })
                  resultX.form.resetfields()
                }
                if (assignForm.value === 'create') {
                  await result.container.createCrud.mutation({
                    variables: values,
                    refetchQueries: [{ query: customerAllQuery }]
                  })
                  resultX.form.resetfields()
                }
              }
            })
          }
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

        const columns = [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
          },
          {
            title: 'TEL',
            dataIndex: 'tel',
            key: 'tel'
          },
          {
            title: 'Cellphone',
            dataIndex: 'cellphone',
            key: 'cellphone'
          },
          {
            title: 'Memo',
            dataIndex: 'memo',
            key: 'memo'
          },
          {
            title: 'Function',
            dataIndex: 'function',
            key: 'function',
            render: (text, record) => (
              <span>
                <Button
                  onClick={() => handleEvent.handleToggleModal(UPDATE, record)}
                >
                  Update
                </Button>
                <Divider type="vertical" />
                <Button onClick={() => handleEvent.handleDelete(record)}>
                  Delete
                </Button>
              </span>
            )
          }
        ]

        if (loading) {
          return <div>Logining</div>
        }

        const dataSet = data[queryName].map(v => {
          return {
            _id: v._id,
            key: v._id,
            name: v.name,
            tel: v.tel,
            cellphone: v.cellphone,
            memo: v.memo
          }
        })

        return (
          <CrudTemplate
            handleEvent={handleEvent}
            columns={columns}
            dataSet={dataSet}
            result={result}
            CreateForm={CreateForm}
            DetailForm={DetailForm}
            UpdateForm={UpdateForm}
          />
        )
      }}
    </AdoptContainer>
  )
}
