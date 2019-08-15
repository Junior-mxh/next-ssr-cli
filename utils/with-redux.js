import React from 'react'
import createSore from '../store/store'
import redirect from './redirect'

const isServer = typeof window === 'undefined'
const __NEXT_REUDX_STORE__ = '__NEXT_REUDX_STORE__'

function getOrCreateStore (initialState) {
  if (isServer) {
    return createSore(initialState)
  }

  if (!window[__NEXT_REUDX_STORE__]) {
    window[__NEXT_REUDX_STORE__] = createSore(initialState)
  }
  return window[__NEXT_REUDX_STORE__]
}

export default Comp => {
  class WithReduxApp extends React.Component {
    constructor (props) {
      super(props)
      this.reduxStore = getOrCreateStore(props.initialReduxState)
    }

    async componentDidMount () {
    }

    render () {

      const { Component, pageProps, ...rest } = this.props

      if (pageProps) {
        pageProps.globalProps = 'this is global props'
      }

      return (
        <Comp
          Component={Component}
          pageProps={pageProps}
          {...rest}
          reduxStore={this.reduxStore}
        />
      )
    }
  }

  WithReduxApp.getInitialProps = async ctx => {
    const { res, err } = ctx.ctx
    let  reduxStore
    // if(res && res.statusCode === 500) {
    //   redirect(ctx.ctx, '/error/500')
    //   return
    // }
    if(res && res.statusCode === 404) {
      redirect(ctx.ctx, '/error/404')
      return
    }else{
      // let {userInfo, isInStudioPage} =  await isAuth(ctx)
      let userInfo = {}
      if(isServer) {
        let { params } = ctx.ctx.req
        if(params) {
          userInfo = params.userInfo
        }
      }
      if(userInfo && Object.keys(userInfo).length >0) {
        reduxStore = getOrCreateStore({
          global: {userInfo, isLogin: true}
        })
      }else{
        reduxStore = getOrCreateStore()
      }
    }
    ctx.reduxStore = reduxStore
    ctx.redirect = redirect
    let appProps = {}
    if (typeof Comp.getInitialProps === 'function') {
      appProps = await Comp.getInitialProps(ctx)
    }

    return {
      ...appProps,
      initialReduxState: reduxStore.getState()
    }
  }

  return WithReduxApp
}
