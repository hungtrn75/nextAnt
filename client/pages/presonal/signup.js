import React from 'react'
import SignupForm from '../../src/features/auth/signup'
import withApollo from '../../src/lib/withApollo'

const Signup = () => <SignupForm />

export default withApollo(Signup)
