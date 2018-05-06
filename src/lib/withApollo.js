import * as React from 'react'
import initApollo from './initApollo';
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import Head from 'next/head'
//import configureStore from '../../store';


function getComponentDisplayName(Component) {
  return Component.displayName || Component.name || 'Unknown'
}

export default (ComposedComponet) => {
  return class WithData extends React.Component {
    static displayName = `WithData(${getComponentDisplayName(ComposedComponet)})`

    static async getInitialProps(ctx) {
      let serverState = { apollo: { data: {} } }
      let composedInitialProps = {}
      if (ComposedComponet.getInitialProps) {
        composedInitialProps = await ComposedComponet.getInitialProps(ctx)
      }
      //      console.log('===apolloA===')
      if (!process.browser) {
        //ServerSide
        const apollo = initApollo();
        const url = { query: ctx.query, pathname: ctx.pathname };
        try {
          await getDataFromTree(
            <ApolloProvider client={apollo}>
              <ComposedComponet url={url} {...composedInitialProps} />
            </ApolloProvider>
          )
        } catch (err) {
          console.log(err)
        }
        Head.rewind();
        serverState = {
          apollo: {
            data: apollo.cache.extract()
          }
        };
      }
      //把ServerSide的資料變成 Props
      return {
        serverState,
        ...composedInitialProps
      }
    }
    //private apollo;
    constructor(props) {
      super(props)
      this.apollo = initApollo(this.props.serverState.apollo.data)
    }
    render() {
      return (
        <ApolloProvider client={this.apollo}>
          <ComposedComponet {...this.props} />
        </ApolloProvider>
      )
    }
  }
}
