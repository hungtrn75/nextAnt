import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { LogicBlock } from './index'
import Form2 from '../../container/product/form'
const FormItem = Form.Item

const FormBlock = ({ form: antForm }) => (
  <LogicBlock.Consumer>
    {resultX => {
      const { handleEvent, result, FormX } = resultX
      const { FormAssign } = result
      // console.log('xxxxxx')
      // console.log(FormX)
      return <Form2 handleEvent={handleEvent} />
      // return <Form handleEvent={handleEvent} />
      // return <FormAssign.value antForm={antForm} handleEvent={handleEvent} record={record} />
    }}
  </LogicBlock.Consumer>
)

export default Form.create()(FormBlock)
