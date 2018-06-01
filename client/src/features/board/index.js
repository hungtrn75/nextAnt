import React from 'react'
import { adopt } from 'react-adopt'
import { Toggle, Value, State } from 'react-powerplug'
import { Button, Divider } from 'antd'
import moment from 'moment'

import CrudTemplate, {
  CREATE,
  UPDATE,
  DETAIL
} from '../../components/crudTemplate'
import Form from './form'
import { CrudContainer, boardQueryPage } from './graphql'

const AdoptContainer = adopt({
  container: <CrudContainer />,
  toggleModal: <Toggle initial={false} />,
  modal: <Value initial={{ title: ' test' }} />,
  crudInfo: <Value initial={{ queryName: 'boardQueryPage' }} />,
  formData: <Value initial={{ formData: {} }} />,
  assignForm: <Value initial={'create'} />,
  recordChoose: <Value initial={''} />,
  formName: <Value initial={'Board'} />,
  pageInfo: <State initial={{ nowPage: 1, pageTotal: null, pageSize: 10 }} />
})

export default () => (
  <AdoptContainer>
    {result => {
      const {
        assignForm,
        toggleModal,
        recordChoose,
        pageInfo,
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
      if (pageInfo.state.pageTotal === null) {
        pageInfo.setState({
          nowPage: 1,
          pageTotal: result.container.query.data.boardQueryTotal.totalCount,
          pageSize: 10
        })
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
                  page: pageInfo.state.nowPage,
                  size: pageInfo.state.pageSize
                }
              }
            ]
          })
          // query.query({
          //   page: pageInfo.state.nowPage,
          //   size: pageInfo.state.pageSize
          // })
          //  console.log('totalCount', totalCount)
          // console.log('size', pageInfo.state.nowPage * pageInfo.state.pageSize)
          if (
            totalCount <=
            (pageInfo.state.nowPage - 1) * pageInfo.state.pageSize
          ) {
            console.log('small')
            result.container.query.refetch({
              page: pageInfo.state.nowPage - 1,
              size: pageInfo.state.pageSize
            })
            pageInfo.setState({
              pageTotal: totalCount,
              nowPage: pageInfo.state.nowPage - 1,
              pageSize: pageInfo.state.pageSize
            })
          } else {
            pageInfo.setState({
              pageTotal: totalCount,
              nowPage: pageInfo.state.nowPage,
              pageSize: pageInfo.state.pageSize
            })
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
                        page: pageInfo.state.nowPage,
                        size: pageInfo.state.pageSize
                      }
                    }
                  ]
                })

                form.resetFields()
              }
              if (assignForm.value === 'create') {
                //    console.log('pageInfo==>', pageInfo)

                let {
                  data: {
                    boardCreate: { totalCount }
                  }
                } = await createCrud.mutation({
                  variables: values,
                  refetchQueries: [
                    {
                      query: boardQueryPage,
                      variables: {
                        page: 1,
                        size: pageInfo.state.pageSize
                      }
                    }
                  ]
                })

                pageInfo.setState({
                  pageTotal: totalCount,
                  nowPage: 1,
                  pageSize: pageInfo.state.pageSize
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
              <Button onClick={handleEvent.handleDelete(record)}>Delete</Button>
            </span>
          )
        }
      ]

      if (loading) return <div>Logining</div>

      let dataSet = data[queryName].map(v => ({
        key: v._id,
        title: v.title,
        content: v.content,
        startDate: moment(v.startDate).format('YYYY/MM/DD'),
        endDate: moment(v.endDate).format('YYYY/MM/DD'),
        _id: v._id
      }))

      const handleChangePage = (page, pageSize) => {
        let pageTotal = data['boardQueryTotal']['totalCount']
        pageInfo.setState({
          nowPage: page,
          pageSize: pageSize,
          pageTotal: pageTotal
        })
        console.log(result.container.query)
        result.container.query.refetch({ page, size: pageSize })
        // result.container.query.fetchMore({
        //   variables: { page, pageSize },
        //   updateQuery: (prev, { fetchMoreResult }) => {
        //     if (!fetchMoreResult) return prev;
        //     return fetchMoreResult
        //   }
        // })
      }

      return (
        <CrudTemplate
          handleChangePage={handleChangePage}
          pageInfo={pageInfo}
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
