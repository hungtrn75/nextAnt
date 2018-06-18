import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import stylesheet from 'antd/dist/antd.min.css'

import Layout from '../src/components/layout'

import withApollo from '../src/lib/withApollo'
import checkLoggedIn from '../src/lib/checkLoggedIn'
import { initGA, logPageView } from '../src/lib/analytics'

class MyApp extends App {
  static async getInitialProps(ctx, apolloClient) {
    const { loginUser } = await checkLoggedIn(ctx, apolloClient)
    return {
      loginUser: loginUser.profile
    }
  }

  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()
  }

  render() {
    const { Component, pageProps, loginUser, styleTags } = this.props

    return (
      <Container>
        <Head>
          <title>Next Ant</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <link rel="icon" href="static/img/favicon.ico" type="image/x-icon" />
          <link
            rel="icon"
            type="image/png"
            href="static/img/favicon-32x32.png"
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href="static/img/favicon-16x16.png"
            sizes="16x16"
          />
          {styleTags}
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
