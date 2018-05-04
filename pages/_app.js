import React from 'react'
import App, { Container } from 'next/app'
import Layout from '../src/components/layout'
import Head from 'next/head'
import stylesheet from 'antd/dist/antd.min.css'

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return <Container>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta charSet='utf-8' />
        <link rel='stylesheet' href='/_next/static/style.css' />
      </Head>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />

      <style jsx global>{`    body {    }  `}</style>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Container>
  }
}