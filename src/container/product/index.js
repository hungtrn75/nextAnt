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
import Form from './form2'

//this place is logic and state place

const AdoptContainer = adopt({
  container: <CrudContainer />,
  toggleModal: <Toggle initial={false} />,
  state: (
    <State initial={{ isLoading: false, data: null }}>
      {({ state, setState }) => (
        <DataReceiver
          data={state.data}
          onSetRecord={record => setState({ record })}
          onStart={() => setState({ isLoading: true })}
          onFinish={data => setState({ data, isLoading: false })}
        />
      )}
    </State>
  ),
  modal: <Value initial={{ title: ' test' }} />,
  crudInfo: <Value initial={{ queryName: 'BoardAllQuery' }} />,
  form: <Value initial={{ value: Form }} />
})

//

export default () => {
  return (
    <AdoptContainer>
      {//({ container, toggleModel, state }) => {
      result => {
        const {
          form,
          toggleModal,
          container: {
            query: { data, loading }
          },
          crudInfo: {
            value: { queryName }
          }
        } = result

        //console.log(result)
        //const dataSet = data
        // console.log('dataSet')

        const handleEvent = {
          handleToggleModal: (action, record) => {
            //open Modal
            toggleModal.toggle()
            switch (action) {
              case DETAIL:
                form.setValue(Form)
                //form.setValue(<Form />)
                break
              case UPDATE:
                form.setValue('UPDATE')
                //form.setValue(<Form />)
                break
              case CREATE:
                form.setValue('CREATE')
                //form.setValue(<Form />)
                break
            }
            console.log('test')
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
          />
        )
      }}
    </AdoptContainer>
  )
}
