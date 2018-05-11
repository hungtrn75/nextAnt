import React from 'react'

import WithApollo from '../src/lib/withApollo'
import Customer from '../src/components/customer'

const CustomerPage = () => <Customer />

export default WithApollo(CustomerPage)
