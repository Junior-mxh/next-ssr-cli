import React from 'react'
import dynamic from 'next/dynamic'
import {message, Button, Checkbox} from 'antd'
import {SortDropDown} from 'vcg'
import './index.less'
import { connect } from 'react-redux'
const WorkItem = dynamic(() => import('~/components/business/center/work-item'))
import { actionCreators } from '~/pages/center/store'
const dropdownList = [
  {name: '时间最新', key: 'date'}
]
// 我的作品组件渲染下拉框数据
const itemDropDownList = [
  { name: '恢复', icon: 'rollback', actionName: 'rollbackItem' },
  { name: '清空', icon: 'delete', actionName: 'deleteItem' },
  { name: '批量恢复', icon: 'rollback', actionName: 'rollbackList' },
  { name: '批量清空', icon: 'delete', actionName: 'deleteItemList' }
]
class RecycleBin extends React.Component {
  constructor (props) {
    super(props)
  }
  rollbackItem () {
    message.info('恢复')
  }
  deleteItem () {
    message.info('清空')
  }
  rollbackList () {
    message.info('批量恢复')
  }
  deleteItemList () {
    message.info('批量清空')
  }
  // 排序操作
  handleOnSortChange ({key}) {
    console.log(key)
  }

  render () {
    const { recycleBin, handleSelectItem, recycleBinClearSelected, selectAllChange } = this.props
    const { selectedList, selectAll = false, dataList } = recycleBin

    return (
      <>
        <div className='selectOptions'>
          <span>
            <Checkbox disabled={dataList.length <= 0} checked={selectAll} onChange={selectAllChange}>全选</Checkbox>
          </span>
          <Button size='small' disabled={selectedList.length <= 0} onClick={recycleBinClearSelected}>清空选中</Button>{' '}
          <Button size='small' disabled={selectedList.length <= 0}>恢复选中</Button>
          <small className='fr selectedNumber'>已选择{selectedList.length}件作品</small>
        </div>
        <div className='item-list clearfix'>
          <span className='sort-element' style={{transform: 'translateY(-60px)'}}>
            <span style={{marginRight: '20px'}}>
              <SortDropDown name={'全部'} list={dropdownList} onSortChange={this.handleOnSortChange}/>
            </span>
            <SortDropDown name={'时间最新'} list={dropdownList} onSortChange={this.handleOnSortChange}/>
          </span>
          {
            dataList.map((o, index) => (
              <div className='item-wrapper' key={index}>
                <WorkItem
                  index={index}
                  active={selectedList.indexOf(index) !== -1}
                  customRenderItem={({index}) => (
                    <section onClick={() => handleSelectItem({index})} className='selecteElemet'>
                      <img src={ossBaseURL + `/center/work-${ selectedList.indexOf(index) !== -1 ? '' : 'un'}selected.png`} alt="选中作品"/>
                    </section>
                  )}
                  showCollaborators={false}
                  dropdown={itemDropDownList}
                  onChange={oData => this[oData.key](oData)} />
              </div>
            ))
          }
          {
            dataList.length <= 0 && (
              <p>暂无数据</p>
            )
          }
        </div>
      </>
    )
  }

}


export default connect(state => ({
  ...state.center, recycleBin: state.center.recycleBin
}), dispatch => ({
  handleSelectItem ({index}) {
    return dispatch(actionCreators.selectItem({index}))
  },
  recycleBinClearSelected () {
    return dispatch(actionCreators.recycleBinClearSelected())
  },
  selectAllChange (e) {
    return dispatch(actionCreators.selectAllChange(e.target.checked))
  }
}))(RecycleBin)