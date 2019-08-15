import  classnames from 'classnames'
import './index.less'
import React from 'react'
import dynamic from 'next/dynamic'
const FollowBtn  = dynamic(() => import('~/components/common/follow-btn'))
export default ({status})=>{
  return (
    <div className="fans-item-card clearfix">
      <div className="avatar">
        <img src={ossBaseURL+'/information/fans-avatar.png'} alt=""/>
      </div>
      <div className="card-detail">
        <div className="name">Boki</div>
        <div className="address">中国，南京</div>
        <div className="profession">Web设计  推广  包装</div>
        <div className="fans-follow-works">
          <div className='follow-wrapper'>
            <FollowBtn status={1}/>
          </div>
          <div className='btn-line'></div>
          <div className='fans-num'>粉丝 <span>12k</span></div>
          <div className='works-num'>创作 <span>321</span></div>
        </div>
      </div>
    </div>
  )
}