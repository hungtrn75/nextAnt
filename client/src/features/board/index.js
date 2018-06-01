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
import { CrudContainer, boardQueryPage } from './graphql'

import { checkUser } from '../auth/grapgql'

const AdoptContainer = adopt({
  checkUser: checkUser(),
  container: <CrudContainer />,
  toggleModal: <Toggle initial={false} />,
  modal: <Value initial={{ title: ' test' }} />,
  crudInfo: <Value initial={{ queryName: 'boardQueryPage' }} />,
  formData: <Value initial={{ formData: {} }} />,
  assignForm: <Value initial={'create'} />,
  recordChoose: <Value initial={''} />,
  formName: <Value initial={'Board'} />,
  nowPage: <Value initial={1} />,
  pageTotal: <Value initial={null} />,
  pageSize: <Value initial={10} />
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
        nowPage,
        pageTotal,
        pageSize,
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
      if (pageTotal.value === null) {
        //console.log(result.container.query.data.boardQueryTotal.totalCount)
        if (result.container.query.data.boardQueryTotal) {
          pageTotal.setValue(
            result.container.query.data.boardQueryTotal.totalCount
          )
        }
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
        handleDelete: record => async () => {
          let values = { _id: record._id }
          let {
            data: {
              boardDelete: { totalCount }
            }
          } = await result.container.deleteCrud.mutation({
            variables: values,
            refetchQueries: [
              {
                query: boardQueryPage,
                variables: {
                  page: nowPage.value,
                  size: pageSize.value
                }
              }
            ]
          })
          if (totalCount <= (nowPage.value - 1) * pageSize.value) {
            result.container.query.refetch({
              page: nowPage.value - 1,
              size: pageSize.value
            })
            pageTotal.setValue(totalCount)
            nowPage.setValue(nowPage.value - 1)
          } else {
            pageTotal.setValue(totalCount)
          }
        },

        handleSubmit: form => () => {
          form.validateFields(async (err, values) => {
            if (!err) {
              recordChoose.setValue(values)

              if (assignForm.value === 'update') {
                values._id = recordChoose.value._id

                await updateCrud.mutation({
                  variables: values,
                  refetchQueries: [
                    {
                      query: boardQueryPage,
                      variables: {
                        page: nowPage.value,
                        size: pageSize.value
                      }
                    }
                  ]
                })

                form.resetFields()
              }
              if (assignForm.value === 'create') {
                nowPage.setValue(1)
                let {
                  data: {
                    boardCreate: { totalCount }
                  }
                } = await createCrud.mutation({
                  variables: values,
                  refetchQueries: [
                    {
                      query: boardQueryPage,
                      variables: { page: 1, size: pageSize.value }
                    }
                  ]
                })

                pageTotal.setValue(totalCount)

                result.container.query.refetch({
                  page: 1,
                  size: pageSize.value
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

      let dataSet = data[queryName].map(v => ({
        key: v._id,
        title: v.title,
        content: v.content,
        startDate: moment(v.startDate).format('YYYY/MM/DD'),
        endDate: moment(v.endDate).format('YYYY/MM/DD'),
        _id: v._id
      }))

      const handleChangePage = (page, pageSize) => {
        //let pageTotal = data['boardQueryTotal']['totalCount']
        nowPage.setValue(page)
        result.container.query.refetch({ page, size: pageSize })
      }
      return (
        <CrudTemplate
          handleChangePage={handleChangePage}
          isUserLoggedIn={isUserLoggedIn}
          handleEvent={handleEvent}
          nowPage={nowPage}
          pageTotal={pageTotal}
          pageSize={pageSize}
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
