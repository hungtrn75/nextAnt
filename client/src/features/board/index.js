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
import { CrudContainer, boardAllQuery } from './graphql'

const AdoptContainer = adopt({
  container: <CrudContainer />,
  toggleModal: <Toggle initial={false} />,
  modal: <Value initial={{ title: ' test' }} />,
  crudInfo: <Value initial={{ queryName: 'boardAllQuery' }} />,
  formData: <Value initial={{ formData: {} }} />,
  assignForm: <Value initial={'create'} />,
  recordChoose: <Value initial={''} />
})

export default () => {
  return (
    <AdoptContainer>
      {result => {
        const {
          assignForm,
          toggleModal,
          recordChoose,
          container: {
            query: { error, data, loading },
            createCrud,
            updateCrud,
            deleteCrud
          },
          crudInfo: {
            value: { queryName }
          }
        } = result

        if (error) {
          return <div>an error occer</div>
        }

        const handleEvent = {
          handleToggleModal: (action, record) => () => {
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
          handleDelete: record => () => {
            let values = { _id: record._id }
            result.container.deleteCrud.mutation({
              variables: values,
              refetchQueries: [{ query: boardAllQuery }]
            })
          },
          handleSubmit: form => () => {
            form.validateFields(async (err, values) => {
              if (!err) {
                recordChoose.setValue(values)

                if (assignForm.value === 'update') {
                  values._id = recordChoose.value._id

                  await updateCrud.mutation({
                    variables: values,
                    refetchQueries: [{ query: boardAllQuery }]
                  })

                  form.resetFields()
                }
                if (assignForm.value === 'create') {
                  await createCrud.mutation({
                    variables: values,
                    refetchQueries: [{ query: boardAllQuery }]
                  })
                  form.resetFields()
                }
                toggleModal.toggle()
              }
            })
          }
        }

        const CreateForm = () => {
          return (
            <Form
              handleEvent={handleEvent}
              loading={createCrud.result.loading}
              actionText={'create'}
            />
          )
        }
        const DetailForm = () => {
          return <Form handleEvent={handleEvent} actionText={'detail'} />
        }
        const UpdateForm = () => {
          return (
            <Form
              handleEvent={handleEvent}
              loading={deleteCrud.result.loading}
              actionText={'update'}
            />
          )
        }

        const columns = [
          {
            title: 'tiTle',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
              <a
                href="#"
                onClick={handleEvent.handleToggleModal(DETAIL, {
                  data: record
                })}
              >
                {' '}
                {text}
              </a>
            )
          },
          {
            title: 'content',
            dataIndex: 'content',
            key: 'content'
          },
          {
            title: 'StateDate',
            dataIndex: 'stateDate',
            key: 'stateData'
          },
          {
            title: 'Function',
            dataIndex: 'endDate',
            key: 'endDate',
            render: (text, record) => {
              return (
                <span>
                  <Button
                    onClick={handleEvent.handleToggleModal(UPDATE, record)}
                  >
                    Update
                  </Button>
                  <Divider type="vertical" />
                  <Button
                    loading={deleteCrud.result.loading}
                    onClick={handleEvent.handleDelete(record)}
                  >
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
        const dataSet = data[queryName].map(v => {
          return {
            key: v._id,
            title: v.title,
            content: v.content,
            stateDate: 'test',
            endDate: 'test',
            _id: v._id
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
