import React, { Component } from 'react'
import './index.less'
import {Dropdown, message, Menu} from 'antd'
import {SortDropDown} from 'vcg'
import dynamic from 'next/dynamic'
import { connect } from 'react-redux'
import { actionCreators } from '~/pages/center/store'
const WorkItem = dynamic(() => import('~/components/business/center/work-item'))
const SwiperWorkList = dynamic(() => import('~/components/common/swiper-work-list'))

const dropdownList = [
  {name: '更新时间最新', key: 'updateTime'}
]
class Collect extends Component {
  constructor (props) {
    super(props)
  }
  editItem (collect, index, {key}) {
    console.log(collect, index, {key})
    message.info('编辑收藏夹')
  }
  deleteItem (collect, index, {key}) {
    message.info('删除收藏夹')
  }

  // 排序操作
  handleOnSortChange ({key}) {
    console.log(key)
  }
  render () {
    const { dataList = [], isSelf, currentCollect, viewCurrentCollect } = this.props
    const marginTop = isSelf ? '45px' : '0px'
    let list = Array.apply(null, {length: 15}).fill('').map((o, i) => ({id: i, pic: ossBaseURL + '/center/work-item.png'}))
    return currentCollect ? (
      <div className='collect-list-wrapper' style={{marginTop}}>
        <div className='collect-list-header'>
          <b className='collect-name'>默认收藏夹</b>
          <small className='collect-desc'>简介</small>
        </div>
        <div className='item-list clearfix'>
          <span className='sort-element'>
            <SortDropDown name={'更新时间最新'} list={dropdownList} onSortChange={this.handleOnSortChange}/>
          </span>
          {
            dataList.map((o, index) => (
              <div className='item-wrapper' key={index}>
                <WorkItem liked/>
              </div>
            ))
          }
        </div>
      </div>
    ) : (
      <div style={{marginTop}}>
        <div className="item-list">
          <span className='sort-element' style={{transform: 'translateY(-22px)'}}>
            <SortDropDown name={'更新时间最新'} list={dropdownList} onSortChange={this.handleOnSortChange}/>
          </span>
        </div>
        {
          dataList && dataList.length > 0 && dataList.map((collect, index) => {
            return (
              <div className='collect-list-wrapper' key={index}>
                <div className='collect-list-header'>
                  <b className='collect-name'>默认收藏夹{index}</b>
                  <small className='collect-list-number'>32件作品</small>
                  <small className='collect-desc'>简介</small>
                  <span className='collect-opt'>
                    <Dropdown overlay={
                      <Menu onClick={({key}) => this[key](collect, index, {key})} style={{width: '82px', minHeight: '35px', boxShadow: '0px 3px 6px rgba(0,0,0,0.16)', borderRadius: 0, padding: '0px 6px'}}>
                        <Menu.Item className='opt-item' key="editItem" style={{padding: 0}}>
                          <section className='opt-item-text'>
                          编辑
                          </section>
                        </Menu.Item>
                        <Menu.Item className='opt-item' key="deleteItem" style={{padding: 0}}>
                          <section className='opt-item-text'>
                          删除
                          </section>
                        </Menu.Item>
                      </Menu>
                    } placement='bottomLeft' trigger={['click']}>
                      <span className='dropdown-inner'>...</span>
                    </Dropdown>
                  </span>
                </div>
                <div className='collect-list-item' onClick={() => viewCurrentCollect(collect, index)}>
                  <SwiperWorkList
                    width='1005px'
                    height={166}
                    data={list}
                    swiperOpt={{
                      slidesPerView: 6,
                      spaceBetween: 14,
                      slidesPerGroup: 1
                    }}/>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}
const mapDispatch = dispatch => ({
  viewCurrentCollect (current, index) {
    return dispatch(actionCreators.viewCurrentCollect({...current, index}))
  }
})

export default connect(state => ({isSelf: state.center.isSelf, ...state.center.collect}), mapDispatch)(Collect)