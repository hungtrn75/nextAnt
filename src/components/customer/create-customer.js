import React from 'react'
import { Mutation } from 'react-apollo'
import { Modal, Button } from 'antd'

import Form from './form'
import { customerAdd } from '../../graphql/customer'

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
    <Mutation mutation={customerAdd} onCompleted={toggleCreate}>
      {(customerAdd, { data }, loading) => (
        <Form forAction="create" loading={loading} customerAdd={customerAdd} />
      )}
    </Mutation>
  </Modal>
)

export default CreateCustomer
