import React from 'react'
import { withRouter } from 'next/router'
import BasicHeader from '~/layout/basic-header/basic-header'
import BasicFooter from '~/layout/basic-footer/basic-footer'
import {connect} from 'react-redux'
import { BackTop } from 'antd'
import './layout.less'

const BasicLayout = (props)=> {
  const {
    debug, router, children, footer,
    backtop, isLogin, userInfo, noShadow,
    showFooterTop
  } = props
  const routeIsLogin = router.route.startsWith('/login')
  const routeIsRegister = router.route.startsWith('/register')
  const routeIsRetrieval = router.route.startsWith('/retrieval')
  const isInStudioPage = router.route.startsWith('/studio')
  return(
    <>
       { !(routeIsLogin || routeIsRegister || routeIsRetrieval) &&
         <>
           { isInStudioPage ? <>工作室头</> : <BasicHeader noShadow={noShadow} />}
         </>
       }
       <div className='app-content'>
         { children }
         {
           debug && (
             <blockquote>
               用户:{ userInfo && userInfo.name}
               <br/>
               是否登陆:{isLogin?'已登陆':'未登陆'}
               <br/>
               是否在工作是页面:{isInStudioPage?'是':'否'}
               <br/>
               <span>{router.route}</span>
             </blockquote>
           )
         }
       </div>
      { !(routeIsLogin || routeIsRegister || routeIsRetrieval) &&
        <>
          { footer ? footer : (isInStudioPage ? <></> : <BasicFooter showTop={showFooterTop}/>)}
        </>
      }
       { backtop ? <BackTop>{backtop}</BackTop> : <BackTop /> }
    </>
  )
}

const mapState = (state) => ({
  userInfo: state.global.userInfo,
  isLogin: state.global.isLogin,
  isInStudioPage: state.global.isInStudioPage
})

const mapDispatch = (dispatch) => ({})
export default connect(mapState, mapDispatch)(withRouter(BasicLayout))
