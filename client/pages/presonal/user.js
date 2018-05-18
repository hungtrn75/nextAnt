import React from 'react'

import User from '../../src/features/user'
import withApollo from '../../src/lib/withApollo'

const UserPage = () => <User />

export default withApollo(UserPage)
