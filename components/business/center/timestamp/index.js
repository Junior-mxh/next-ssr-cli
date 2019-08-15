import React from 'react'
import classNames from 'classnames'
import { VcgTab, VcgTable } from 'vcg'
import { Icon } from 'antd'
import './index.less'
import dynamic from 'next/dynamic'
import { connect } from 'react-redux'
const AccountInfo = dynamic(() => import('~/components/business/center/timestamp/account-info'))

const columnsOfBuy = [
  {title: '发放时间', key: 'date'},
  {title: '发放原因', key: 'reason'},
  {title: '数量', key: 'count'},
  {title: '金额', key: 'price'}
]
const dataOfBuy = [
  {date: '2019-01-01', reason: '充值奖励', count: 10, price: 100},
  {date: '2019-01-02', reason: '充值', count: 12, price: 101},
  {date: '2019-01-03', reason: '充值多奖励', count: 13, price: 102}
]
const columnsOfUse = [
  {title: '使用时间', key: 'date', titleRender: (column, index) => (<><Icon type='clock-circle' />{' '}<i>{column.title}</i></>)},
  {title: '使用作品', key: 'work', render: (row, column, index) => (<a href={row.credential} style={{textDecoration: 'underline'}}>{row.work}</a>)},
  {title: '使用数量', key: 'count'},
  {title: '电子证书', key: 'credential', render: (row, column, index) => (<a href={row.credential} style={{color: '#000', textDecoration: 'underline'}}>{row.work}</a>)}
]
const dataOfUse = [
  {date: '2019-01-01', work: '作品1', count: 10, credential: 'https://www.shijue.com/credential.pdf'},
  {date: '2019-01-02', work: '作品2', count: 12, credential: 'https://www.shijue.com/credential.pdf'},
  {date: '2019-01-03', work: '作品3', count: 13, credential: 'https://www.shijue.com/credential.pdf'},
  {date: '2019-01-04', work: '作品4', count: 14, credential: 'https://www.shijue.com/credential.pdf'},
  {date: '2019-01-05', work: '作品5', count: 15, credential: 'https://www.shijue.com/credential.pdf'}
]



class TimeStamp extends React.Component {
  render () {
    const { fromOther = {}, routerModule = 'center', subTabList, userId, type = 'accountInfo'} = this.props
    const _routerModule = fromOther.routerModule || routerModule
    const _subTabList = fromOther.subTabList || subTabList
    const _userId = fromOther.userId || userId
    const _type = fromOther.type || type

    const tabProps = {
      data: _subTabList,
      render: tab => (
        <a href={`/${_routerModule}/${_userId}/timestamp?type=${tab.value}`} key={tab.value}
          className={classNames('tab-sub-item', {active: _type === tab.value})}>{tab.name}</a>
      )
    }
    const ChildComponent = () => {
      const _ComponentOfKey = {
        accountInfo: () => <AccountInfo />,
        buyHistory: () => <div><VcgTable stripe border columns={columnsOfBuy} data={dataOfBuy} /></div>,
        useHistory: () => <div><VcgTable columns={columnsOfUse} data={dataOfUse} /></div>
      }
      return _ComponentOfKey[_type]()
    }
    return (
      <>
        <VcgTab {...tabProps} />
        <div style={{height: type === 'accountInfo' ? '31px' : '41px'}} />
        <ChildComponent />
      </>
    )
  }
}

// TimeStamp.defaultProps = {
//   routerModule: 'center'
// }


export default connect(state => ({
  userId: state.center.userId,
  type: state.center.type,
  subTabList: state.center.subTabList
}))(TimeStamp)
