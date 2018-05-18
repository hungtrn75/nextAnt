import React from 'react'
import Board from '../src/container/board'
import withApollo from '../src/lib/withApollo'

const Home = () => <Board />

export default withApollo(Home)
