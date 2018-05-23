import React from 'react'
import PropTypes from 'prop-types'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import Head from 'next/head'

import initApollo from './initApollo'

const getCookie = (ctx = {}) =>
  ctx.req && ctx.req.headers.cookie ? ctx.req.headers.cookie : document.cookie

const getComponentDisplayName = Component =>
  Component.displayName || Component.name || 'Unknown'

export default ComposedComponet => {
  return class WithData extends React.Component {
    static displayName = `WithData(${getComponentDisplayName(
      ComposedComponet
    )})`

    static async getInitialProps({ ctx }) {
      let serverState = {}

      const apollo = initApollo(
        {},
        {
          getToken: () => getCookie(ctx)
        }
      )

      let composedInitialProps = {}

      if (ComposedComponet.getInitialProps) {
        composedInitialProps = await ComposedComponet.getInitialProps(
          ctx,
          apollo
        )
      }

      if (!process.browser) {
        const url = { query: ctx.query, pathname: ctx.pathname }
        try {
          await getDataFromTree(
            <ApolloProvider client={apollo}>
              <ComposedComponet url={url} {...composedInitialProps} />
            </ApolloProvider>
          )
        } catch (err) {
          console.log(err)
        }

        Head.rewind()

        serverState = apollo.cache.extract()
      }

      return {
        serverState,
        ...composedInitialProps
      }
    }
    constructor(props) {
      super(props)
      this.apollo = initApollo(this.props.serverState, {
        getToken: () => getCookie()
      })
    }
    render() {
      return (
        <ApolloProvider client={this.apollo}>
          <ComposedComponet {...this.props} />
        </ApolloProvider>
      )
    }
  }

  WithData.propTypes = {
    serverState: PropTypes.object
  }
}
