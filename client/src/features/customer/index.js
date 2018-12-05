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
import { checkUser } from '../auth/grapgql'

const AdoptContainer = adopt({
  checkUser: checkUser(),
  container: <CrudContainer />,
  toggleModal: <Toggle initial={false} />,
  modal: <Value initial={{ title: ' test' }} />,
  crudInfo: <Value initial={{ queryName: 'customerAllQuery' }} />,
  formData: <Value initial={{ formData: {} }} />,
  assignForm: <Value initial={'create'} />,
  recordChoose: <Value initial={''} />,
  formName: <Value initial={'Customer'} />
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
          updateCrud,
          deleteCrud
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
            refetchQueries: [{ query: customerAllQuery }]
          })
        },

        handleSubmit: resultX => () => {
          resultX.form.validateFields(async (err, values) => {
            if (!err) {
              recordChoose.setValue(values)

              if (assignForm.value === 'update') {
                values._id = recordChoose.value._id
                await result.container.updateCrud.mutation({
                  variables: values,
                  refetchQueries: [{ query: customerAllQuery }]
                })
                resultX.form.resetFields()
              }
              if (assignForm.value === 'create') {
                await result.container.createCrud.mutation({
                  variables: values,
                  refetchQueries: [{ query: customerAllQuery }]
                })
                resultX.form.resetFields()
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
          loading={updateCrud.result.loading}
          actionText={'update'}
        />
      )
      const ActionLink = (text, record) => (
        <span>
          <Button onClick={handleEvent.handleToggleModal(UPDATE, record)}>
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
        isUserLoggedIn
          ? {
              title: 'Actions',
              dataIndex: 'actions',
              key: 'actions',
              render: ActionLink
            }
          : {}
      ]

      if (loading) return <div>Loading</div>

      const dataSet = data[queryName].map(v => ({
        _id: v._id,
        key: v._id,
        name: v.name,
        tel: v.tel,
        cellphone: v.cellphone,
        memo: v.memo
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
