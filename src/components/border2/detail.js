import React, { Component } from 'react'
import { CrudContext } from './index'
import { List } from 'antd'

export default class DetailForm extends Component {
  render() {
    return (
      <CrudContext.Consumer>
        {({ modal }) => {
          const { record } = modal
          console.log(record)
          const data = [
            `Title : ${record.data.title}`,
            `Content : ${record.data.content}`
          ]
          return (
            <List
              bordered
              dataSource={data}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          )
        }}
      </CrudContext.Consumer>
    )
  }
}
