import dynamic from 'next/dynamic'
import classNames from 'classnames'
import React, {Component} from 'react'
import './index.less'
import {message} from 'antd'
import {VcgTab} from 'vcg'
import { connect } from 'react-redux'
const ActivityItem =  dynamic(() => import('~/components/business/information/activity-item'))
const itemDropDownList = [
  { name: '编辑作品', icon: 'edit', actionName: 'editItem' },
  { name: '删除作品', icon: 'delete', actionName: 'deleteItem' }
]


class ActivityComponent extends Component {
  constructor (props) {
    super(props)
  }

  handleFollowBtn (oData) {
    console.log(oData)
    message.info('按钮')
    // 根据状态 确定操作 如果 data.isSeif === true 为撤回操作
  }
  render () {
    const { dataList, isSelf, userId, type, subTabList } = this.props
    const tabProps = {
      data: subTabList,
      render: tab => (
        <a href={`/center/${userId}/activity?type=${tab.value}`} key={tab.value}
          className={classNames('tab-sub-item', {active: type === tab.value})}>{tab.name}</a>
      )
    }
    return (
      <>
        <div style={{height: '10px'}} />
        <VcgTab {...tabProps} />
        <div style={{height: '30px'}} />
        <div className='clearfix'>
          {
            dataList.map((item, index)=>{
              return (
                <div className='item-wrapper' key={index}>
                  <ActivityItem data={item} isSelf={isSelf}
                    dropdown={itemDropDownList}
                    onChange={oData => this[oData.key](oData)}
                    onFollowClick={oData => this.handleFollowBtn(oData)}
                  />
                </div>
              )
            })
          }
        </div>
      </>
    )
  }
}


export default connect(state => ({
  ...state.center.activity,
  userId: state.center.userId,
  type: state.center.type,
  subTabList: state.center.subTabList
}))(ActivityComponent)
