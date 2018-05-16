import React from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import { Modal, Button } from 'antd'

import Form from './form'
import { customerCreate } from '../../graphql/customer'

const CreateCustomer = ({ showCreate, toggleCreate }) => (
  <Modal
    title="Add New Customer"
    visible={showCreate}
    onCancel={toggleCreate}
    footer={[
      <Button key="back" onClick={toggleCreate}>
        Cancel
      </Button>
    ]}
  >
    <Mutation mutation={customerCreate} onCompleted={toggleCreate}>
      {(customerCreate, { data }, loading) => (
        <Form
          forAction="create"
          loading={loading}
          customerCreate={customerCreate}
        />
      )}
    </Mutation>
  </Modal>
)

CreateCustomer.propTypes = {
  showCreate: PropTypes.bool.isRequired,
  toggleCreate: PropTypes.func.isRequired
}

export default CreateCustomer
