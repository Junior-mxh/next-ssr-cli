import React from 'react'
import  './header.less'
import Link from 'next/link'
import {connect} from 'react-redux'
import classnames from 'classnames'
const BasicHeader = (props) => (
  <div className={classnames('basic-header-wrapper', {noShadow: props.noShadow})}>
    <div className="basic-header">
      <h1 className='logo fl'>
        <a href="/" title='logo'>
          <img src={ossBaseURL + '/common/logo.png'} />
        </a>
      </h1>
      {/* 必须使用a 标签*/}
      <ul className={'nav-list fl'}>
        <li className={'active'}><Link href={'/'}><a>首页</a></Link></li>
        <li><Link href='/'><a>活动</a></Link></li>
        <li><Link href={'/detail/4454'}><a>工作室</a></Link></li>
        <li><Link href={'/'}><a>发现</a></Link></li>
        <li><Link href={'/'}><a>版权</a></Link></li>
        <li><Link href={'/'}><a>...</a></Link></li>
        <li>搜索</li>
      </ul>
      <div className="headerRightModule fr">
        <div className="userInfo fl">
          <img src={ossBaseURL + '/common/avatar-demo.gif'}/>
          <span className={'notification'}>消息</span>
        </div>
        <div className="uploadWorks fl">
          <span className={'uploadElement'}>+ 上传作品</span>
        </div>
      </div>
    </div>
  </div>
)


const mapState = (state) => ({
  userInfo: state.global.userInfo,
  isLogin: state.global.isLogin
})

const mapDispatch = (dispatch) => ({})
export default connect(mapState, mapDispatch)(BasicHeader)
