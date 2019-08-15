import React, {useState} from 'react'
// import Router from 'next/router'
import { withRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { actionCreators } from './store'
import { connect } from 'react-redux'
import  classnames from 'classnames'
import Link from 'next/link'
import './index.less'
import redirect from '~/utils/redirect'
const UserInfoCard  = dynamic(() => import('~/components/business/center/user-info-card'))
const InformationTab  = dynamic(() => import('~/components/business/information/information-tab'))
const Fans = dynamic(() => import('~/components/business/information/fans'))
const Follow = dynamic(() => import('~/components/business/information/follow'))
const Timestamp = dynamic(() => import('~/components/business/center/timestamp'))
const Account = dynamic(() => import('~/components/business/information/account'))

class Information extends React.Component {
  static getInitialProps (context) {
    const {
      module,
      userId
    } = context.ctx.req.params
    if(!userId || !module) {
      redirect(context.ctx, '/error/404')
    }
    const { reduxStore } = context
    const { global } = reduxStore.getState()
    const isSelf = (!global.userInfo || !global.userInfo.userId) ? false : (+global.userInfo.userId === +userId)// true 内网  false外网
    reduxStore.dispatch(actionCreators.setInformationData({
      userId,
      currentModule: module,
      query: context.router.query,
      isSelf
    }))
  }
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
    let { userInfo, router, todo } = this.props
    let {
      userId,
      tabIndex,
      subTabIndex,
      tabList,
      subTabList,
      currentModule,
      // currentComponentData,
      query,
      isSelf
    } = this.props.initData
    const timestampProps = {
      routerModule: 'information', userId, type: query.type, subTabList
    }
    const ActiveComponent = () => {
      const active = {
        fans: () => <Fans />, // 粉丝
        follow: () => <Follow />, // 关注
        timestamp: () => <Timestamp fromOther={timestampProps}  />, // 时间戳
        account: () => <Account /> // 关注
      }
      return active[currentModule]()
    }
    return(
      <div className='information-wrapper clearfix'>
        <div className='left-bar' onClick={todo}>
          <div className='user-card-wrapper'>
            <UserInfoCard userInfo={userInfo} isSelf={isSelf} />
          </div>
          <div style={{marginTop: 17}}>
            <InformationTab link href={tab => `/${tab.value === 'works'?'center':'information'}/${userId}/${tab.value}`} data={tabList} value={tabIndex}  />
          </div>
        </div>
        <div className='right-bar'>
          <div className='layout-wrapper'>
            <ActiveComponent />
          </div>
        </div>
      </div>
    )
  }


}


const mapState = (state) => ({
  userInfo: state.global.userInfo,
  initData: state.information.initData
})

const mapDispatch = (dispatch) => ({

})
export default connect(mapState, mapDispatch)(withRouter(Information))
