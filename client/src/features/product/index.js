import React from 'react'
import { adopt } from 'react-adopt'
import { Toggle, Value } from 'react-powerplug'
import { Button, Divider, Switch } from 'antd'

import CrudTemplate, {
  CREATE,
  UPDATE,
  DETAIL
} from '../../components/crudTemplate'
import Form from './form'
import { CrudContainer, productAllQuery } from './graphql'

const AdoptContainer = adopt({
  container: <CrudContainer />,
  toggleModal: <Toggle initial={false} />,
  modal: <Value initial={{ title: ' test' }} />,
  crudInfo: <Value initial={{ queryName: 'productAllQuery' }} />,
  formData: <Value initial={{ formData: {} }} />,
  assignForm: <Value initial={'create'} />,
  recordChoose: <Value initial={''} />,
  formName: <Value initial={'Product'} />
})

export default () => (
  <AdoptContainer>
    {result => {
      const {
        assignForm,
        toggleModal,
        recordChoose,
        container: {
          query: { data, loading },
          createCrud,
          updateCrud,
          deleteCrud
        },
        crudInfo: {
          value: { queryName }
        }
      } = result

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
            refetchQueries: [{ query: productAllQuery }]
          })
        },

        handleSubmit: resultX => () => {
          resultX.form.validateFields(async (err, values) => {
            if (!err) {
              toggleModal.toggle()
              recordChoose.setValue(values)

              if (assignForm.value === 'update') {
                values._id = recordChoose.value._id
                await result.container.updateCrud.mutation({
                  variables: values,
                  refetchQueries: [{ query: productAllQuery }]
                })
                resultX.form.resetFields()
              }
              if (assignForm.value === 'create') {
                await result.container.createCrud.mutation({
                  variables: values,
                  refetchQueries: [{ query: productAllQuery }]
                })
                resultX.form.resetFields()
              }
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

      const UpdateForm = () => (
        <Form
          handleEvent={handleEvent}
          loading={updateCrud.result.loading}
          actionText={'update'}
        />
      )

      const DetailForm = () => (
        <Form handleEvent={handleEvent} actionText={'detail'} />
      )

      const columns = [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          width: 250,
          render: (text, record) => (
            <a href="#" onClick={handleEvent.handleToggleModal(DETAIL, record)}>
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
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
          defaultSortOrder: 'descend',
          width: 100,
          sorter: (a, b) => a.price - b.price
        },
        {
          title: 'Hide',
          dataIndex: 'hide',
          key: 'hide',
          width: 10,
          render: (text, record) => <Switch checked={record.hide} />
        },
        {
          title: 'Actions',
          dataIndex: 'actions',
          key: 'actions',
          width: 250,
          render: (text, record) => (
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
        }
      ]

      if (loading) return <div>Logining</div>

      const dataSet = data[queryName].map(
        ({ _id, title, content, price, hide }) => ({
          key: _id,
          _id,
          title,
          content,
          price,
          hide
        })
      )

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
