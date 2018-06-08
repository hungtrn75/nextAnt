import React from 'react'
import { Form, Input, Button } from 'antd'
import PropTypes from 'prop-types'

const FormItem = Form.Item

const createSearchSet = initValue => handleSearch => {
  const SearchSet = props => {
    const { form } = props

    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = form

    const userNameError =
      isFieldTouched('userName') && getFieldError('userName')
    const passwordError =
      isFieldTouched('password') && getFieldError('password')

    const hasErrors = fieldsError =>
      Object.keys(fieldsError).some(field => fieldsError[field])

    return (
      <Form layout="inline">
        <FormItem
          validateStatus={userNameError ? 'error' : ''}
          help={userNameError || ''}
        >
          {getFieldDecorator('title', {
            initialValue: initValue.title.value
          })(<Input placeholder="Title" />)}
        </FormItem>
        <FormItem
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError || ''}
        >
          {getFieldDecorator('content', {
            initialValue: initValue.content.value
          })(<Input placeholder="content" />)}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            disabled={hasErrors(getFieldsError())}
            onClick={() => handleSearch(props.form)}
          >
            Search
          </Button>
        </FormItem>
      </Form>
    )
  }

  SearchSet.propTypes = {
    form: PropTypes.shape({
      getFieldDecorator: PropTypes.func,
      getFieldsError: PropTypes.func,
      getFieldError: PropTypes.func,
      isFieldTouched: PropTypes.func
    })
  }

  return SearchSet
}

export default initValue => handleSearch =>
  Form.create()(createSearchSet(initValue)(handleSearch))
