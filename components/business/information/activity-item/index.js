import dynamic from 'next/dynamic'
import React from 'react'
import './index.less'
import { VcgIcon } from 'vcg'
import {Dropdown, Icon, Menu} from 'antd'
const FollowBtn  = dynamic(() => import('~/components/common/follow-btn'))


export default (props)=>{
  let {
    isSelf = true,
    data,
    onChange,
    dropdown,
    onFollowClick
  } = props


  const menu = (
    // onChange 调用后期加入map的当前数据 emit到外部组件
    <Menu onClick={(oData => onChange(oData))}>
      {
        dropdown && dropdown.length && dropdown.map(item => (
          <Menu.Item  key={item.actionName}><Icon type={item.icon} />{item.name}</Menu.Item>
        ))
      }
    </Menu>
  )

  const url = '/information/activity-item.png'
  const sponsorAvatar = '/information/fans-avatar.png'
  return (
    <div className='activity-item'>
      <div className='pic-content' style={{background: `url(${ossBaseURL}${url}) center center /cover no-repeat`}}>
        {
          !isSelf &&
          <div className='top-bar clearfix'>
            <div className='sponsor'>
              <img src={`${ossBaseURL}${sponsorAvatar}`} alt=""/>
              <span>南京大学</span>
            </div>
            <div className='drop-bar'>
              <Dropdown overlay={menu} placement='bottomLeft' trigger={['click']} >
                <span className='dropdown-inner'>
                    ...
                </span>
              </Dropdown>
            </div>
          </div>
        }
        <div className='activity-date'>
          离活动开启还有2天
        </div>
      </div>

      <div  className='title-bar clearfix'>
        <div className='game-name clearfix'>
          <VcgIcon type={'huodongyeka1'} className="activity-icon"/>
          <span className='name'>第三届中国高校现代设计大赛</span>
          <span className='news'>新增3件作品</span>
        </div>
        <div className='follow-btn-wrapper'>
          <FollowBtn {...{
            status: isSelf ? data.status :-1// 传入当前状态 , -1 撤回按钮
          }}
          onClick={()=>onFollowClick({...data})}
          />
        </div>
      </div>
    </div>
  )
}