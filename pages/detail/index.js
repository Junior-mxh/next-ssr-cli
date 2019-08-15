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

import {Pagination, VcgIcon} from 'vcg'
const UserInfoCard = dynamic(() => import('~/components/business/center/user-info-card'))
const SwiperWorkList = dynamic(() => import('~/components/common/swiper-work-list'))

class Detail extends React.Component {
  static getInitialProps (context) {
    const {
      // module,
      userId
    } = context.ctx.req.params
    if(!userId) {
      redirect(context.ctx, '/error/404')
    }
    const { reduxStore } = context
    const { global } = reduxStore.getState()
    const isSelf = (!global.userInfo || !global.userInfo.userId) ? false : (+global.userInfo.userId === +userId)// true 内网  false外网
    reduxStore.dispatch(actionCreators.setDetailData({
      userId,
      // currentModule: module,
      query: context.router.query,
      isSelf
    }))

  }
  constructor (props) {
    super(props)
    this.state = {
      currentPage: 1,
      isLoading: false
    }
  }
  handlePaginationChange = (e)=>{
    console.log('当前加载第'+e+'页')
    this.setState({
      isLoading: true,
      currentPage: e
    }, ()=>{
      setTimeout(()=>{
        this.setState({
          isLoading: false
        })
        console.log('加载成功')
      }, 3000)
    })

  }
  render () {
    let {
      userInfo,
      userId,
      isSelf,
      query
    } = this.props
    let data = [
      {id: '1111', pic: 'https://shijue-static-dev.oss-cn-beijing.aliyuncs.com/shijue/information/fans-avatar.png'},
      {id: '1111', pic: 'https://shijue-static-dev.oss-cn-beijing.aliyuncs.com/shijue/information/fans-avatar.png'},
      {id: '1111', pic: 'https://shijue-static-dev.oss-cn-beijing.aliyuncs.com/shijue/information/fans-avatar.png'},
      {id: '1111', pic: 'https://shijue-static-dev.oss-cn-beijing.aliyuncs.com/shijue/information/fans-avatar.png'},
      {id: '1111', pic: 'https://shijue-static-dev.oss-cn-beijing.aliyuncs.com/shijue/information/fans-avatar.png'},
      {id: '1111', pic: 'https://shijue-static-dev.oss-cn-beijing.aliyuncs.com/shijue/information/fans-avatar.png'},
      {id: '1111', pic: 'https://shijue-static-dev.oss-cn-beijing.aliyuncs.com/shijue/information/fans-avatar.png'},
      {id: '1111', pic: 'https://shijue-static-dev.oss-cn-beijing.aliyuncs.com/shijue/information/fans-avatar.png'},
      {id: '1111', pic: 'https://shijue-static-dev.oss-cn-beijing.aliyuncs.com/shijue/information/fans-avatar.png'}
    ]
    return(
      <div className='detail-bg'>
        <div className='detail-wrapper'>
          <div className='author-bar'></div>
          <div className='detail-content'>
            <div className='work-main clearfix'>
              <img className='right-icon' src={ossBaseURL+'/detail/detail-right-icon.png'} alt=""/>
              <div className='title-bar'>
                <div className='title'>
                  一个荒废的名字
                </div>
                <div className='marker-wrapper clearfix'>
                  <div className='marker-left'>
                    <div className='tag fl'>原创</div>
                    <div className='marker fl'>插画 </div>
                    <div className='marker fl'>商业插画 </div>
                    <div className='time fl'>2019-03-26 08:04</div>
                    <div className='marker fl'>蒸气朋克</div>
                    <div className='marker fl'>插图</div>
                  </div>
                  <div className='marker-right'>
                    <div className="fr looked">
                      <VcgIcon type='dianzan'></VcgIcon>
                      <span>20</span>
                    </div>
                    <div className="fr likes" style={{marginRight: 20}}>
                      <VcgIcon type='liulan'></VcgIcon>
                      <span>7444</span>
                    </div>
                    <div className="fr auth-area" style={{marginRight: 30}}>
                      仅自己可见
                    </div>
                    <div className="icon fr vertical-line"style={{marginRight: 20}} >
                    </div>
                    <div className="icon fr" style={{marginRight: 20}}>
                      <VcgIcon type='fuwenbenkuang8'></VcgIcon>
                    </div>
                    <div className="icon fr" style={{marginRight: 20}}>
                      <VcgIcon type='tianjiafujian'></VcgIcon>
                    </div>
                  </div>
                </div>
              </div>
              <div className='description-bar'>
                <div className='description-text'>
                  创作思路，所有介绍都可以写在这里。么得感情的内文。创作思路，所有介绍都可以写在这里。么得感情的内文。创作思路，所有介绍都可以写在这里。
                  创作思路，所有介绍都可以写在这里。么得感情的内文。创作思路，所有介绍都可以写在这里。么得感情的内文。创作思路，所有介绍都可以写在这里。
                  创作思路，所有介绍都可以写在这里。么得感情的内文。创作思路，所有介绍都可以写在这里。么得感情的内文。创作思路，所有介绍都可以写在这里。
                  创作思路，所有介绍都可以写在这里。么得感情的内文。创作思路，所有介绍都可以写在这里。么得感情的内文。创作思路，所有介绍都可以写在这里。
                </div>
              </div>
              <div className="content-bar clearfix">
                <div className="pic-box">
                  <img className='img' src={ossBaseURL+'/detail/examp-detail-pic.png'} alt=""/>
                  <div className='pic-des'>
                    <div className='pic-title'>参加比赛的初稿</div>
                    <div className='title-underline'></div>
                  </div>
                </div>

                <div className="text-description">
                  么得感情的内文。创作思路，所有介绍都可以写在这里，也可堆图。么得感情的内文。创作思路，所有介绍都可以写在这里，也可堆图。么得感情的内文。创作思路，所有介绍都可以写在这里，也可堆图。么得感情的内文。创作思路，所有介绍都可以写在这里，也可堆图。
                  么得感情的内文。创作思路，所有介绍都可以写在这里，也可堆图。么得感情的内文。创作思路，所有介绍都可以写在这里，也可堆图。么得感情的内文。
                </div>

                <div className="pic-box">
                  <video className='video' src="movie.ogg" controls="controls">
                    您的浏览器不支持 video 标签。
                  </video>
                  <div className='pic-des'>
                    <div className='pic-title'>参加比赛的初稿</div>
                    <div className='title-underline'></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="annex-bar">
              <div className="annex-title">
                附件
              </div>

              <div className="annex-item">
                <div className='annex-icon color-1'>PS</div>
                <span>插图.psd</span>
              </div>

              <div className="annex-item">
                <div  className='annex-icon color-2'>PDF</div>
                <span>手册排版文件….pdf</span>
              </div>
            </div>
            <div className="like-bar">
              <div className='like-icon-wrapper'>
                <VcgIcon type='dianzan' size={42}></VcgIcon>
                <div className='num'>398</div>
              </div>
              <div className='like-description'>赞一下，让更多人看见精彩作品！</div>
            </div>
            <div className='share-bar'>
              <div className='fr report'>
                举报
              </div>
              <div className='icon-share'>
              </div>
              <div className='icon-favorite'>
              </div>
            </div>
          </div>
          <div className="operate-bar">
            <ul>
              <li>
                <VcgIcon type='fenxiang' size={20}/>
              </li>
              <li>
                <VcgIcon type='shoucang' size={20}/>
              </li>
              <li>
                <VcgIcon type='edit' size={20}/>
              </li>
              <li>
                <VcgIcon type='shanchuzuopin' size={20}/>
              </li>
            </ul>
          </div>

          <div className='commit-bar clearfix'>
            <div className='left-bar fl'>
              <div className='user-card'>
                <UserInfoCard/>
              </div>
            </div>
            <div className="right-bar fr">
              <div className="works-about" style={{margin: '0 auto'}}>
                <div className='works-about-wrapper'>
                  <div className='work-select-bar'>
                    <div className='select-item selected'>相关作品</div>
                    <div  className='select-item unselected'>所属作品集</div>
                  </div>
                  <div className='works-list-bar'>
                    <SwiperWorkList {...{data, width: 976, height: 118, swiperOpt: {slidesPerView: 6,
                      spaceBetween: 10,
                      slidesPerGroup: 6}}}/>
                  </div>
                </div>
              </div>
              <div className='commit-content'>
                <div className="commit-write-bar clearfix">
                  <div className="commit-avatar fl">
                    <img src="https://shijue-static-dev.oss-cn-beijing.aliyuncs.com/shijue/information/fans-avatar.png" alt=""/>
                  </div>
                  <div className="commit-operate fr clearfix">
                    <div className="input-bar">
                      <div className='div-textarea' contentEditable="true"/>
                      <span>0/200</span>
                    </div>
                    <div className='clearfix commit-operate-bar'>
                      <div className='fl commit-emoji'>
                        <VcgIcon size={18} type='tianjiabiaoqing'/>
                        <span>发个表情</span>
                      </div>
                      <div className='fr commit-btn'>评论</div>
                    </div>
                  </div>

                </div>
                <div className="commit-list-bar">
                  <div className='title'>
                    全部评论<span>20</span>
                  </div>

                </div>
              </div>
              <div className='guess-like'>
                <div className='title'>猜你喜欢</div>
                <SwiperWorkList {...{data, width: 1050, height: 118, swiperOpt: {slidesPerView: 6,
                  spaceBetween: 10,
                  slidesPerGroup: 6}}}/>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}



const mapState = (state) => ({
  userInfo: state.global.userInfo,
  ...state.information.initData
})

const mapDispatch = (dispatch) => ({

})

export default connect(mapState, mapDispatch)(withRouter(Detail))