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
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="static/img/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="static/img/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="static/img/favicon-16x16.png"
          />
          <link
            rel="mask-icon"
            href="static/img/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="theme-color" content="#ffffff" />
          <link rel="manifest" href="static/site.webmanifest" />
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
