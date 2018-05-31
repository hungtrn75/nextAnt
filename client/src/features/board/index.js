import React from 'react'
import { adopt } from 'react-adopt'
import { Toggle, Value } from 'react-powerplug'
import { Button, Divider } from 'antd'
import moment from 'moment'

import CrudTemplate, {
  CREATE,
  UPDATE,
  DETAIL
} from '../../components/crudTemplate'
import Form from './form'
import { CrudContainer, boardAllQuery } from './graphql'
import { checkUser } from '../auth/grapgql'

const AdoptContainer = adopt({
  checkUser: checkUser(),
  container: <CrudContainer />,
  toggleModal: <Toggle initial={false} />,
  modal: <Value initial={{ title: ' test' }} />,
  crudInfo: <Value initial={{ queryName: 'boardAllQuery' }} />,
  formData: <Value initial={{ formData: {} }} />,
  assignForm: <Value initial={'create'} />,
  recordChoose: <Value initial={''} />,
  formName: <Value initial={'Board'} />
})

export default () => (
  <AdoptContainer>
    {result => {
      const {
        checkUser: {
          data: { isUserLoggedIn }
        },
        assignForm,
        toggleModal,
        recordChoose,
        container: {
          query: { error, data, loading },
          createCrud,
          deleteCrud,
          updateCrud
        },
        crudInfo: {
          value: { queryName }
        }
      } = result

      if (error) return <div>an error occer</div>

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

      const CreateForm = () => (
        <Form
          handleEvent={handleEvent}
          loading={createCrud.result.loading}
          actionText={'create'}
        />
      )

      const DetailForm = () => (
        <Form handleEvent={handleEvent} actionText={'detail'} />
      )

      const UpdateForm = () => (
        <Form
          handleEvent={handleEvent}
          loading={deleteCrud.result.loading}
          actionText={'update'}
        />
      )

      const columns = [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          width: 150,
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
          title: 'Content',
          dataIndex: 'content',
          key: 'content'
        },
        {
          title: 'Start Date',
          dataIndex: 'startDate',
          key: 'startDate',
          width: 130,
          sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate)
        },
        isUserLoggedIn
          ? {
              title: 'Actions',
              dataIndex: 'actions',
              key: 'actions',
              width: 250,
              render: (text, record) => (
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
          : {}
      ]

      if (loading) return <div>Loading</div>

      const dataSet = data[queryName].map(v => ({
        key: v._id,
        title: v.title,
        content: v.content,
        startDate: moment(v.startDate).format('YYYY/MM/DD'),
        endDate: moment(v.endDate).format('YYYY/MM/DD'),
        _id: v._id
      }))

      return (
        <CrudTemplate
          isUserLoggedIn={isUserLoggedIn}
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
