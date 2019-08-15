import React from 'react'
import App, { Container } from 'next/app'
import { Provider } from 'react-redux'
import Router from 'next/router'
import NProgress from 'nprogress'
import BasicLayout from '~/layout/index'
import reduxHoc from '~/utils/with-redux'
import 'nprogress/nprogress.css'
import 'antd/dist/antd.less'
import '~/assets/css/index.less'


class BasicApp extends App {
  static async getInitialProps (ctx) { // 公共的方法，获取全局数据
    const { Component } = ctx
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return {
      pageProps
    }
  }

  componentDidMount () {
    Router.onRouteChangeStart = () => NProgress.start()
    Router.onRouteChangeComplete = () => {
      NProgress.done()
      if (process.env.NODE_ENV !== 'production') {
        // const els = document.querySelectorAll('link[href*="/_next/static/css/styles.chunk.css"]')
        // const timestamp = new Date().valueOf()
        // els[0].href = '/_next/static/css/styles.chunk.css?v=' + timestamp
      }
    }
    Router.onRouteChangeError = () => NProgress.done()
  }
  componentWillUnmount () {
    Router.onRouteChangeStart = () => NProgress.start()
    Router.onRouteChangeComplete = () => NProgress.done()
    Router.onRouteChangeError = () => NProgress.done()
  }

  render () {
    const { Component, pageProps, reduxStore }  = this.props
    return (
      <Container>
        <Provider store={reduxStore}>
          <div className='vcg-app'>
            <BasicLayout { ...pageProps }>
              <Component { ...pageProps }/>
            </BasicLayout>
          </div>
        </Provider>
      </Container>
    )
  }
}

export default reduxHoc(BasicApp)
