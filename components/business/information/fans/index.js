import React, {useState} from 'react'
// import Router from 'next/router'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import  classnames from 'classnames'
import Link from 'next/link'
import { Skeleton, Carousel} from 'antd'
import './index.less'
import dynamic from 'next/dynamic'
const FansCard =  dynamic(() => import('~/components/business/information/fans-card'))
const SwiperWorkList =  dynamic(() => import('~/components/common/swiper-work-list'))



class Fans extends React.Component {
  static getInitialProps (context) {
  }
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount () {
  }
  render () {
    let data = [{id: '1111', pic: 'https://shijue-static-dev.oss-cn-beijing.aliyuncs.com/shijue/information/fans-avatar.png'}, {id: '1111', pic: 'https://shijue-static-dev.oss-cn-beijing.aliyuncs.com/shijue/information/fans-avatar.png'}, {id: '1111', pic: ''}, {id: '1111', pic: ''}, {id: '1111', pic: ''}, {id: '1111', pic: ''}, {id: '1111', pic: ''}, {id: '1111', pic: ''}, {id: '1111', pic: ''}]
    return(
      <div >
        <div className='tab-title'>
          <div className='name'>粉丝</div>
          <div className='num'>200</div>
        </div>
        <div className="fans-list">
          <div className="fans-item clearfix">
            <FansCard/>
            <div style={{width: 590, float: 'left', marginLeft: 20, overflow: 'hidden'}}>
              <SwiperWorkList {...{data, width: 590, height: 110, swiperOpt: {slidesPerView: 4,
                spaceBetween: 10,
                slidesPerGroup: 4}}}/>
            </div>
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
export default connect(mapState, mapDispatch)(withRouter(Fans))
