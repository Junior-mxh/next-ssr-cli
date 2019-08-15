import React, {useState} from 'react'
import  classNames from 'classnames'
import './index.less'

export default (props)=>{
  const url = '/information/hobby-pic.png'
  const {
    data
  } = props
  return (
    <div className='hobby-item-wrapper'>
      <div className='pic-wrapper' style={{background: `url(${ossBaseURL}${url}) center center /cover no-repeat`}}>
        <div className='top-mask'>
          <div className='tag'>
            动态图像设计
          </div>
        </div>
      </div>
      <div  className={classNames({'hobby-btn': true, 'followed': true})}>已关注</div>
    </div>
  )
}