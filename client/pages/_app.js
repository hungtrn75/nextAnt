import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import stylesheet from 'antd/dist/antd.min.css'

import Layout from '../src/components/layout'

import withApollo from '../src/lib/withApollo'
import checkLoggedIn from '../src/lib/checkLoggedIn'

class MyApp extends App {
  static async getInitialProps(ctx, apolloClient) {
    const { loginUser } = await checkLoggedIn(ctx, apolloClient)
    return {
      loginUser: loginUser.profile
    }
  }

  render() {
    const { Component, pageProps, loginUser } = this.props

    return (
      <Container>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <Layout loginUser={loginUser}>
          <Component {...pageProps} />
        </Layout>
      </Container>
    )
  }
}

export default withApollo(MyApp)
