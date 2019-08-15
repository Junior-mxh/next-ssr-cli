import dynamic from 'next/dynamic'
import React, {Component} from 'react'
import './index.less'
import {message} from 'antd'
const ActivityItem =  dynamic(() => import('~/components/business/information/activity-item'))
// 活动item下拉选项
const itemDropDownList = [
  { name: '编辑作品', icon: 'edit', actionName: 'editItem' },
  // { name: '投稿活动', icon: 'container', actionName: 'touGao' },
  // { name: '加入作品集', icon: 'plus-square', actionName: 'joinWorkList' },
  { name: '删除作品', icon: 'delete', actionName: 'deleteItem' }
]



export default class ActivityFollowList extends Component {
  constructor (props) {
    super(props)
  }

  // 编辑作品
  editItem ({key}) {
    message.info('编辑作品')
  }
  // 投稿活动
  touGao ({key}) {
    message.info('投稿活动')
  }
  // 加入作品集
  joinWorkList ({key}) {
    message.info('加入作品集')
  }
  // 删除作品
  deleteItem ({key}) {
    message.info('删除作品')
  }

  handleFollowBtn (oData) {
    console.log(oData)
    message.info('按钮')
    // 根据状态 确定操作 如果 data.isSeif === true 为撤回操作
  }
  render () {
    const { userId, data, type = 'default', isSelf, onSortChange, currentModule } = this.props
    let mapList = [
      {
        name: '',
        status: 1
      },
      {
        name: '',
        value: 1
      },
      {
        name: '',
        value: 1
      }
    ]
    return (
      <div style={{width: '100%'}}>
        {
          mapList.map((item, index)=>{
            return (
              <div className='item-wrapper' key={index}>
                <ActivityItem {...{
                  data: item,
                  isSelf: false// 区分内外网展示
                }}
                dropdown={itemDropDownList}
                onChange={oData => this[oData.key](oData)}
                onFollowClick={oData => this.handleFollowBtn(oData)}
                />
              </div>
            )
          })
        }
      </div>
    )
  }

}