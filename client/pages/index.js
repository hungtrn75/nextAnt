import React from 'react'

import withApollo from '../src/lib/withApollo'
import Board from '../src/features/board'

const Home = () => <Board />

export default withApollo(Home)
