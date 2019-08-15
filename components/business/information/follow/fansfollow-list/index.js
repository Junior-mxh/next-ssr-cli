import dynamic from 'next/dynamic'
import React from 'react'
const FansCard =  dynamic(() => import('~/components/business/information/fans-card'))
const SwiperWorkList =  dynamic(() => import('~/components/common/swiper-work-list'))

export default (props)=>{
  let {data} = props
  return (
    <div>
      <FansCard/>
      <div style={{width: 590, float: 'left', marginLeft: 20, overflow: 'hidden'}}>
        <SwiperWorkList {...{data, width: 590, height: 110, swiperOpt: {slidesPerView: 4,
          spaceBetween: 10,
          slidesPerGroup: 4}}}/>
      </div>
    </div>
  )
}