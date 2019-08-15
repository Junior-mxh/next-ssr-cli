import React, { Component } from 'react'
import dynamic from 'next/dynamic'
import classNames from 'classnames'
import {message} from 'antd'
import {VcgIcon, SortDropDown, VcgTab} from 'vcg'
import './index.less'
import { connect } from 'react-redux'
const CollectComponent = dynamic(() => import('~/components/business/center/collect')) // 收藏
const WorksListComponent = dynamic(() => import('~/components/business/center/works-list')) // 作品集
const GiveALikeComponent = dynamic(() => import('~/components/business/center/give-a-like')) // 点赞
const WorkItem = dynamic(() => import('~/components/business/center/work-item')) // 默认我的作品
const RecycleBin = dynamic(() => import('~/components/business/center/works/recycle-bin')) // 默认我的作品


// 我的作品组件渲染下拉框数据
const itemDropDownList = [
  { name: '编辑作品', icon: 'edit', actionName: 'editItem' },
  { name: '投稿活动', icon: 'container', actionName: 'touGao' },
  { name: '加入作品集', icon: 'plus-square', actionName: 'joinWorkList' },
  { name: '删除作品', icon: 'delete', actionName: 'deleteItem' }
]
const dropdownList = [
  {name: '时间最新', key: 'date'}
]
class Works extends Component {
  constructor (props) {
    super(props)
  }
  // 排序操作
  handleOnSortChange ({key}) {
    console.log(key)
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
  render () {
    const { userId, works, type = 'default', isSelf, subTabList } = this.props
    const { dataList } = works
    const ChildComponent = () => {
      const _ComponentOfKey = {
        // 默认加载我的作品模块, 不再抽离
        default: () => (
          <div className='item-list clearfix'>
            <span className='sort-element' style={{transform: 'translateY(-3px)'}}>
              <span style={{marginRight: '20px'}}>
                <SortDropDown name={'全部'} list={dropdownList} onSortChange={this.handleOnSortChange}/>
              </span>
              <SortDropDown name={'时间最新'} list={dropdownList} onSortChange={this.handleOnSortChange}/>
            </span>
            {
              dataList.map((o, index) => (
                <div className='item-wrapper' key={index}>
                  <WorkItem dropdown={itemDropDownList} onChange={oData => this[oData.key](oData)} />
                </div>
              ))
            }
          </div>
        ),
        worksList: () => <WorksListComponent />,
        recycleBin: () => <RecycleBin />,
        collect: () => <CollectComponent />,
        giveALike: () => <GiveALikeComponent />
      }
      return _ComponentOfKey[type]()
    }
    const tabProps = {
      data: subTabList,
      render: tab => (
        <a href={`/center/${userId}/works?type=${tab.value}`} key={tab.value}
          className={classNames('tab-sub-item', {active: type === tab.value})}>{tab.name}</a>
      )
    }
    return (
      <>
        <div className='clearfix' style={{position: 'relative', marginTop: !isSelf ? 0 : '35px'}}>
          {
            isSelf && (
              <>
                <div className="works-sub-tab">
                  <VcgTab {...tabProps} />
                </div>
                <section className='search-work-item'>
                  <VcgIcon type='sousuo' height='19px' />
                </section>
              </>
            )
          }
        </div>
        <ChildComponent />
      </>
    )
  }
}


export default connect(state => ({
  ...state.center,
  works: state.center.works
}), dispatch => ({dispatch}))(Works)