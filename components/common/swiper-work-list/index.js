import React from 'react'
import './index.less'
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import { VcgIcon } from 'vcg'
import classNames from 'classnames'
import {withRouter} from 'next/dist/client/router'
class SwiperWorkList extends React.Component {
  static getInitialProps (context) {
  }
  constructor (props) {
    super(props)
    this.state = {
      activeIndex: 0
    }
  }
  componentDidMount () {
    this.initSwiper()
  }

  initSwiper () {
    const { customClass, swiperOpt } = this.props
    let _this = this
    const ins = new Swiper(`.${customClass}`,  {
      ...swiperOpt,
      loopFillGroupWithBlank: true,
      navigation: {
        nextEl: '.my-button-next',
        prevEl: '.my-button-prev'
      },
      on: {
        slideChangeTransitionEnd: function () {
          _this.setState({
            activeIndex: this.activeIndex
          })
        }
      }
    })
  }
  render () {
    let {
      data,
      render,
      width = 590,
      height = 110,
      swiperOpt,
      customClass
    } = this.props
    const { activeIndex } = this.state
    const commonStyle = {height, lineHeight: height + 'px'}
    return (
      <div className="fans-item-work">
        <div className={classNames('swiper-container', {[customClass]: true})}>
          <div className="swiper-wrapper" style={{width}}>
            {
              data && data.length && data.map((item, index)=>{
                if (render) {
                  return render(item, index)
                }
                return (
                  <div className="swiper-slide" key={index}>
                    <div className='my-work-item' style={{height, background: `url(${item.pic}) center center /cover no-repeat`}}>
                    </div>
                  </div>
                )
              })
            }
          </div>

          <div className="my-button-prev" style={{...commonStyle, display: activeIndex> 0 ? 'block' : 'none'}}>
            <VcgIcon type={'jiantouzuo'} className="fans-icon" />
          </div>
          <div className="my-button-next" style={{...commonStyle, display: activeIndex< data.length - swiperOpt.slidesPerView?'block':'none'}}>
            <VcgIcon type={'jiantouyou'} className="fans-icon"/>
          </div>
        </div>
      </div>
    )
  }


}
SwiperWorkList.defaultProps = {
  swiperOpt: {
    slidesPerView: 4,
    spaceBetween: 10,
    slidesPerGroup: 4
  }
}
export default withRouter(SwiperWorkList)