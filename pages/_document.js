import Document, { Html, Head, NextScript, Main } from 'next/document'
import CustomHead from '~/components/head'
import React from 'react'
class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const props = await Document.getInitialProps(ctx)
    return {
      ...props
    }
  }
  render () {
    return (
      <Html>
        <Head>
          <CustomHead />
        </Head>
        <body>
          <Main />
          <NextScript/>
        </body>
      </Html>
    )
  }

}

export default  MyDocument