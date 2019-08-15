import React, { Component } from 'react'
import './index.less'
import {SortDropDown} from 'vcg'
import dynamic from 'next/dynamic'
import { connect } from 'react-redux'
const WorkItem = dynamic(() => import('~/components/business/center/work-item'))

const dropdownList = [
  {name: '时间最新', key: 'date'}
]
class GiveALikeComponent extends Component {

  // 排序操作
  handleOnSortChange ({key}) {
    console.log(key)
  }
  render () {
    const { dataList = [] } = this.props
    return (
      <div className='item-list clearfix'>
        <span className='sort-element'>
          <SortDropDown name={'时间最新'} list={dropdownList} onSortChange={this.handleOnSortChange}/>
        </span>
        {
          dataList.map((o, index) => (
            <div className='item-wrapper' key={index}>
              <WorkItem
                like
                canNotEdit
                {...this.props}
                customRenderItem={() => (
                  <section className='user-item'>
                    <span className='user-avatar'>
                      <img src={ossBaseURL + '/common/avatar-demo.gif'} alt="用户头像"/>
                    </span>
                    <span className='user-name'>测试名字</span>
                  </section>
                )}/>
            </div>
          ))
        }
      </div>
    )
  }
}

export default connect(state => ({isSelf: state.center.isSelf, ...state.center.giveALike}))(GiveALikeComponent)


