import React, { Component } from 'react'
import { adopt } from 'react-adopt'
import { Toggle, State, Value } from 'react-powerplug'
import CrudTemplate, {
  CREATE,
  DELETE,
  UPDATE,
  DETAIL
} from '../../components/crudTemplate'
import { CrudContainer } from './graphql'
import { Button, Divider } from 'antd'
import Form from './form'
import { productAllQuery } from '../../graphql/product'
//this place is logic and state place

const AdoptContainer = adopt({
  container: <CrudContainer />,
  toggleModal: <Toggle initial={false} />,
  modal: <Value initial={{ title: ' test' }} />,
  crudInfo: <Value initial={{ queryName: 'productAllQuery' }} />,
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
        console.log(result)
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
                recordChoose.setValue(record.data)
                assignForm.setValue('detail')
                break
              case UPDATE:
                assignForm.setValue('update')
                console.log('update')
                console.log(record.data)
                recordChoose.setValue(record.data)
                break
              case CREATE:
                assignForm.setValue('create')
                recordChoose.setValue('')
                break
            }
          },
          handleDelete: record => {
            console.log('delete')
            let values = { productId: recordChoose.value.productId }
            result.container.deleteCrud.mutation({
              variables: values,
              refetchQueries: [{ query: productAllQuery }]
            })
          },
          handleSubmit: resultX => {
            resultX.e.preventDefault()
            resultX.form.validateFields(async (err, values) => {
              if (!err) {
                toggleModal.toggle()
                recordChoose.setValue(values)

                if (assignForm.value === 'update') {
                  values.productId = recordChoose.value.productId
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
            //console.log('handleSubmit')
          }
        }

        const columns = [
          {
            title: 'TiTle',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
              <a
                href="#"
                onClick={() =>
                  handleEvent.handleToggleModal(DETAIL, { data: record })
                }
              >
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
                    onClick={() =>
                      handleEvent.handleToggleModal(UPDATE, { data: record })
                    }
                  >
                    Update
                  </Button>
                  <Divider type="vertical" />
                  <Button onClick={() => handleEvent.handleDelete({ record })}>
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
            title: v.Title,
            content: v.Content,
            stateDate: 'test',
            endDate: 'test',
            productId: v.productId
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
