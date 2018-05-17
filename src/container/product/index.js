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

//this place is logic and state place

const AdoptContainer = adopt({
  container: <CrudContainer />,
  toggleModal: <Toggle initial={false} />,
  modal: <Value initial={{ title: ' test' }} />,
  crudInfo: <Value initial={{ queryName: 'BoardAllQuery' }} />,
  record: <Value initial={{ record: {} }} />
})

export default () => {
  return (
    <AdoptContainer>
      {//({ container, toggleModel, state }) => {
      result => {
        const {
          FormAssign,
          toggleModal,
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
                break
              case UPDATE:
                break
              case CREATE:
                break
            }
          },
          handleDelete: record => {
            console.log('delete')
          },
          handleSubmit: data => {
            console.log('handleSubmit')
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
                      handleEvent.handleToggleModal(UPDATE, { record })
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
            ProductId: v.ProductId
          }
        })
        return (
          <CrudTemplate
            handleEvent={handleEvent}
            columns={columns}
            dataSet={dataSet}
            result={result}
            FormX={Form}
          />
        )
      }}
    </AdoptContainer>
  )
}
