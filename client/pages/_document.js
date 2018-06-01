import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <title>Next Ant</title>
          <meta content="width=device-width,initial-scale=1" name="viewport" />
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
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
