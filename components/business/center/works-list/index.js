import React, { Component } from 'react'
import dynamic from 'next/dynamic'
import {SortDropDown} from 'vcg'
import { connect } from 'react-redux'
const WorkListItem = dynamic(() => import('~/components/business/center/works-list/work-list-item'))
const dropdownList = [
  {name: '时间最新', key: 'date'}
]
class WorksList extends Component {
  // 排序操作
  handleOnSortChange ({key}) {
    console.log(key)
  }
  render () {
    const { worksList, isSelf } = this.props
    return (
      <>
        <div className='item-list clearfix'>
          <span className='sort-element' style={{transform: 'translateY(-3px)'}}>
            <span style={{marginRight: '20px'}}>
              <SortDropDown name={'全部'} list={dropdownList} onSortChange={this.handleOnSortChange}/>
            </span>
            <SortDropDown name={'时间最新'} list={dropdownList} onSortChange={this.handleOnSortChange}/>
          </span>
          {
            worksList.dataList.map((o, index) => (
              <div className='item-wrapper' key={index}>
                <WorkListItem isSelf={isSelf} />
              </div>
            ))
          }
        </div>
      </>
    )
  }
}
const mapState = state => {
  return {
    worksList: state.center.worksList,
    ...state.center
  }
}
const mapDispatch = dispatch => {
  return {}
}
export default connect(mapState, mapDispatch)(WorksList)