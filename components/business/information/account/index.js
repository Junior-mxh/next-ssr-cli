import React, {useState} from 'react'
// import Router from 'next/router'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import  classNames from 'classnames'
import Link from 'next/link'
import { Skeleton, Carousel} from 'antd'
import './index.less'
import dynamic from 'next/dynamic'
const Personal = dynamic(() => import('./personal'))
const Preference = dynamic(() => import('./preference'))
const Manage = dynamic(() => import('./manage'))
const VcgTab =  dynamic(() => import('~/components/business/center/vcg-tab'))

//
// const subTabList = [
//   { name: '关注的人', value: 'default', number: 111},
//   { name: '工作室', value: 'studio', number: 111},
//   { name: '活动', value: 'activity', number: 111 }
// ]

class Account extends React.Component {
  static getInitialProps (context) {

  }
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount () {
  }
  render () {
    let data = [{id: '1111', pic: 'https://shijue-static-dev.oss-cn-beijing.aliyuncs.com/shijue/information/fans-avatar.png'}, {id: '1111', pic: 'https://shijue-static-dev.oss-cn-beijing.aliyuncs.com/shijue/information/fans-avatar.png'}, {id: '1111', pic: ''}, {id: '1111', pic: ''}, {id: '1111', pic: ''}, {id: '1111', pic: ''}, {id: '1111', pic: ''}, {id: '1111', pic: ''}, {id: '1111', pic: ''}]
    let { userInfo, router } = this.props
    let {
      userId,
      subTabIndex,
      subTabList,
      currentModule,
      query,
      // currentComponentData,
      isSelf
    } = this.props.initData
    let type = query.type || 'default'
    const ChildComponent = () => {
      const _ComponentOfKey = {
        default: () => <Personal {...{data}}/>,
        preference: () => <Preference />,
        manage: () => <Manage />
      }
      return _ComponentOfKey[type]()
    }
    const tabProps = {
      data: subTabList,
      render: tab => (
        <a href={`/information/${userId}/account?type=${tab.value}`} key={tab.value}
          className={classNames('tab-sub-item', {active: type === tab.value})}>{tab.name} <span>{tab.number}</span></a>
      )
    }
    return(
      <>
        {/* <div className='tab-title'>*/}
        {/*  <div className='name'>关注</div>*/}
        {/*  /!* <div className='num'>200</div>*!/*/}
        {/* </div>*/}
        <div style={{marginTop: 35}}>
          <VcgTab {...tabProps} />
        </div>
        <div className="fans-list">
          <div className="fans-item clearfix">
            <ChildComponent />
          </div>
        </div>
      </>
    )
  }
}
const mapState = (state) => ({
  userInfo: state.global.userInfo,
  initData: state.information.initData
})

const mapDispatch = (dispatch) => ({
})
export default connect(mapState, mapDispatch)(withRouter(Account))
