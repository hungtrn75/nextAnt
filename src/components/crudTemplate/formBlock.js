import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { LogicBlock } from './index'
import { BoardAllQuery } from '../../graphql/board'

const FormItem = Form.Item

const FormBlock = ({ form: antForm }) => (
  <LogicBlock.Consumer>
    {({ result: { form } }) => {
      return <form.value antForm={antForm} />
    }}
  </LogicBlock.Consumer>
)

export default Form.create()(FormBlock)
