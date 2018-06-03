import React from 'react'
import { Form, Input, Button } from 'antd'
import { Query } from 'react-apollo'

import { boardQueryPage } from './graphql'

const FormItem = Form.Item

const SearchBlock = handleSearch => props => {
  const {
    getFieldDecorator,
    getFieldsError,
    getFieldError,
    isFieldTouched
  } = props.form
  const userNameError = isFieldTouched('userName') && getFieldError('userName')
  const passwordError = isFieldTouched('password') && getFieldError('password')
  console.log('handleSearch', handleSearch)
  // const handleSubmit = () => {

  //   props.form.validateFields(async (err, values) => {
  //     if (!err) {
  //       values.page = 1
  //       values.size = 10
  //     }
  //   })
  // }
  const hasErrors = fieldsError => {
    return Object.keys(fieldsError).some(field => fieldsError[field])
  }
  return (
    <Form layout="inline">
      <FormItem
        validateStatus={userNameError ? 'error' : ''}
        help={userNameError || ''}
      >
        {getFieldDecorator('title')(<Input placeholder="Title" />)}
      </FormItem>
      <FormItem
        validateStatus={passwordError ? 'error' : ''}
        help={passwordError || ''}
      >
        {getFieldDecorator('content', {})(<Input placeholder="content" />)}
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          htmlType="submit"
          disabled={hasErrors(getFieldsError())}
          onClick={() => handleSearch(props.form)}
        >
          Search
        </Button>
      </FormItem>
    </Form>
  )
}
const SearchSet = handleSearch => Form.create()(SearchBlock(handleSearch))
console.log(SearchSet)
export default SearchSet
