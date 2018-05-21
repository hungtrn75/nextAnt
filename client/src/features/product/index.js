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
import { CrudContainer, productAllQuery } from './graphql'

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
            console.log('delete')

            let values = { productId: record.productId }
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
                  resultX.form.resetfields()
                }
                if (assignForm.value === 'create') {
                  await result.container.createCrud.mutation({
                    variables: values,
                    refetchQueries: [{ query: productAllQuery }]
                  })
                  resultX.form.resetfields()
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
                onClick={() => handleEvent.handleToggleModal(DETAIL, record)}
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
                      handleEvent.handleToggleModal(UPDATE, record)
                    }
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
