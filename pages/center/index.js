import React from 'react'
import { withRouter } from 'next/router'
import dynamic from 'next/dynamic'
import classNames from 'classnames'
import Head from '~/components/head'
import { connect } from 'react-redux'
import redirect from '~/utils/redirect'
import { Button, Icon, Upload  } from 'antd'
import { actionCreators } from './store'
import './index.less'
const WorksComponent = dynamic(() => import('~/components/business/center/works'))
const StudioComponent = dynamic(() => import('~/components/business/center/studio'))
const ActivityComponent = dynamic(() => import('~/components/business/center/activity'))
const ContractComponent = dynamic(() => import('~/components/business/center/contract'))
const TimestampComponent = dynamic(() => import('~/components/business/center/timestamp'))
const NotificationComponent = dynamic(() => import('~/components/business/center/notification'))
const WorksListComponent = dynamic(() => import('~/components/business/center/works-list'))
const CollectComponent = dynamic(() => import('~/components/business/center/collect'))
const GiveALikeComponent = dynamic(() => import('~/components/business/center/give-a-like'))
const VcgTab = dynamic(() => import('~/components/business/center/vcg-tab'))
const UserInfoCard = dynamic(() => import('~/components/business/center/user-info-card'))




class UserCenter extends React.Component {

  static getInitialProps (context) {
    const { module, userId } = context.ctx.req.params
    if(!userId || !module) {
      redirect(context.ctx, '/error/404')
    }
    const { reduxStore } = context
    const { global } = reduxStore.getState()
    const isSelf = (!global.userInfo || !global.userInfo.userId) ? false : (+global.userInfo.userId === +userId)// true 内网  false外网
    reduxStore.dispatch(actionCreators.setUserCenterData({
      userId,
      currentModule: module,
      query: context.router.query,
      isSelf
    }))
  }

  constructor (props) {
    super(props)
  }

  render () {
    let { userInfo = {}, visitorList, userId, tabIndex, tabList, currentModule, isSelf } = this.props




    // mock 用户背景图数据
    userInfo.banner = `${ossBaseURL}/center/user-default-banner.png`
    // userInfo.banner = null

    const tdk = {
      title: `个人中心-${userInfo.name || ''}`,
      description: `个人中心描述信息-${userInfo.name || ''}`
    }

    const ActiveComponentOfTab = (props) => {
      const active = {
        works: () => <WorksComponent />, // 作业
        studio: () => <StudioComponent />, // 工作室
        activity: () => <ActivityComponent />, // 活动
        contract: () => <ContractComponent />, // 签约
        timestamp: () => <TimestampComponent />, // 时间戳
        notification: () => <NotificationComponent />, // 通知
        worksList: () => <WorksListComponent />, // 作品集
        collect: () => <CollectComponent />, // 收藏
        giveALike: () => <GiveALikeComponent /> // 点赞
      }
      return active[currentModule]()
    }
    return (
      <>
        <Head {...tdk} />
        {/* 如果是自己查看自己的个人中心, 如果有背景图就显示, 没有就默认, 上传背景图一直可见*/}
        {/* 如果是其他人查看, 或者自己未登录, 那么有背景图就显示, 没有就显示默认图片*/}
        <div className={classNames('user-banner', {'none-banner': !userInfo.banner})} style={{background: `url(${userInfo.banner})`}}>
          {
            isSelf && (
              <Upload showUploadList={false}>
                <section className='uploadTip'>
                  <Icon type='plus' />
                  <strong>上传头图</strong>
                  <small>最佳尺寸 xxxxxxxxxxxxxx</small>
                </section>
              </Upload>
            )
          }
        </div>


        <div className="center-content clearfix">
          <div className="user-info-panel fl">
            <div className="user-info-card-box">
              <UserInfoCard userInfo={userInfo} isSelf={isSelf}/>
              <section className='options'>
                <p><span>人气</span><b>21w</b></p>
                <p><span>粉丝</span><b><a href={`/information/${userId}/fans`}>20087</a></b></p>
                <p><span>关注</span><b><a href={`/information/${userId}/follow`}>121</a></b></p>
                <p><span>荣誉</span><b>4</b></p>
              </section>
              {
                !isSelf && (
                  <>
                    <div className="works clearfix">
                      <section className='work-avatar'>
                        <img src={ossBaseURL + '/common/avatar-demo.gif'} alt="工作室头像"/>
                      </section>
                      <section className='work-info'>
                        <b className='work-name'>山师大包装工作室</b>
                        <small className='work-description'>推广 &nbsp; 包装</small>
                      </section>
                      <section className='work-manage'>
                        <Button size='small' shape='round'>管理</Button>
                      </section>
                    </div>
                    <div className='works-about'>
                      <p>
                        简介简介简介简介简介简介简介简介简介简介简介简介简介简介介简介简介简介简
                        介简介简介简介简介简介简介简介简介简介简介简介简介简
                      </p>
                      <section className='clearfix'>
                        <span><img src={ossBaseURL + '/common/weibo.png'} /></span>
                        <span><img src={ossBaseURL + '/common/wechat.png'} /></span>
                      </section>
                    </div>
                  </>
                )
              }
            </div>
            <br/>
            {/* 访客列表*/}
            {
              !isSelf && (
                <div className="center-visitor">
                  <strong className='panel-title'>访客</strong>
                  <div className="center-visitor-list clearfix">
                    {
                      visitorList.length && visitorList.map((visitor, index) => {
                        return (
                          <section key={index}>
                            <img src={ `${ossBaseURL}/common/avatar-demo.gif`} alt="访客头像"/>
                            <span className='text-overflow'>{visitor.name || 'Abhou'}</span>
                            <small>{visitor.date || '刚刚'}</small>
                          </section>
                        )
                      })
                    }
                  </div>
                </div>
              )
            }
          </div>
          <div className="user-tab-content fl">
            <VcgTab link href={tab => `/center/${userId}/${tab.value}${tab.query}`} data={tabList} value={tabIndex} />
            <div>
              <ActiveComponentOfTab />
            </div>
          </div>
        </div>
      </>
    )
  }
}


const mapState = (state) => {
  return ({
    userInfo: state.global.userInfo,
    ...state.center
  })
}

const mapDispatch = (dispatch) => ({
})
export default connect(mapState, mapDispatch)(withRouter(UserCenter))
