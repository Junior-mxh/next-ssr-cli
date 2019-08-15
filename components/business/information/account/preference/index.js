import dynamic from 'next/dynamic'
import React, {Component} from 'react'
import './index.less'
import {message} from 'antd'
const HobbyItem =  dynamic(() => import('~/components/business/information/hobby-item'))




export default class ActivityFollowList extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { userId, data, type = 'default', isSelf, onSortChange, currentModule } = this.props
    const listMap = [
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {}
    ]
    return (
      <div style={{width: '100%'}}>
        <div className='tip'>：）选择你的兴趣标签，我们可以更准确地推荐内容给你</div>
        {
          listMap.map((item, index)=>{
            return (
              <div className='hobby-item' key={index}>
                <HobbyItem/>
              </div>
            )
          })
        }
      </div>
    )
  }

}