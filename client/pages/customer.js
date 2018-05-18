import React from 'react'

import withApollo from '../src/lib/withApollo'
import Customer from '../src/container/customer'

const CustomerPage = () => <Customer />

export default withApollo(CustomerPage)
