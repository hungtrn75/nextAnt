import React from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import { Modal, Button } from 'antd'

import Form from './form'
import { customerUpdate } from '../../graphql/customer'

const UpdateCustomer = ({ showUpdate, toggleUpdate, updateData }) => (
  <Modal
    title="Update Customer"
    visible={showUpdate}
    onCancel={toggleUpdate}
    footer={[
      <Button key="back" onClick={toggleUpdate}>
        Cancel
      </Button>
    ]}
  >
    <Mutation mutation={customerUpdate} onCompleted={toggleUpdate}>
      {(customerUpdate, { data }, loading) => (
        <Form
          forAction="update"
          loading={loading}
          customerUpdate={customerUpdate}
          updateData={updateData}
        />
      )}
    </Mutation>
  </Modal>
)

UpdateCustomer.propTypes = {
  showUpdate: PropTypes.bool.isRequired,
  toggleUpdate: PropTypes.func.isRequired,
  updateData: PropTypes.object.isRequired
}

export default UpdateCustomer
