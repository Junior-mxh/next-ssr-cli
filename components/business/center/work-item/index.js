import React from 'react'
import {Icon, Menu, Dropdown, Skeleton} from 'antd'
import {VcgIcon} from 'vcg'
import classNames from 'classnames'
import './index.less'
// work-item.png
class WorkItem extends React.Component {

  state = {
    visible: false,
    loading: true
  }
  componentDidMount () {
    this.setState({loading: false})
  }

  onVisibleChange = visible => {
    this.setState({visible})
  }


  render () {
    const {
      active, isSelf,
      dropdown, onChange,
      showCollaborators = true,
      customRenderItem, onClick,
      liked = false,
      index,
      canNotEdit = false
    } = this.props
    const { visible, loading } = this.state
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
    const collaborators = (
      <Menu style={{width: '205px', minHeight: '50px', boxShadow: '0px 3px 6px rgba(0,0,0,0.16)', borderRadius: 0, padding: '23px 16px 9px 16px'}}>
        <Menu.Item className='collaborator' key="1" style={{padding: 0}}>
          <section className='collaborator-item'>
            <img src={ossBaseURL + '/common/avatar-demo.gif'} alt="用户头像"/>
            <span className='collaborator-name'>丹麦Doki</span>
          </section>
        </Menu.Item>
        <Menu.Item className='collaborator' key="2" style={{padding: 0}}>
          <section className='collaborator-item'>
            <img src={ossBaseURL + '/common/avatar-demo.gif'} alt="用户头像"/>
            <span className='collaborator-name'>Axing</span>
          </section>
        </Menu.Item>
      </Menu>
    )
    if (loading) {
      return (
        <div className='work-item' style={{border: '1px solid #ccc', padding: '10px'}}>
          <Skeleton active paragraph={{rows: 6}} loading={loading} />
        </div>
      )
    }
    return (
      <div className={classNames('work-item', { active: active || visible })} onClick={() => onClick && onClick(index)}>
        <img className='work-image' src={ossBaseURL + '/center/work-item.png'} alt="作品图片"/>
        {
          !isSelf || canNotEdit ? (
            <div className='work-tool-modal'>
              {
                customRenderItem && customRenderItem({index})
              }
              <strong className='work-item-name'>午后对话-习作No.32</strong>
              <span className='work-item-type'>装帧设计</span>
              <section className='view-and-like'>
                <span>
                  <Icon type="eye" />
                  7,444
                </span>
                <span>
                  <Icon type="like" />20
                </span>
                <section className='like-click'>
                  {
                    liked ? <VcgIcon type='shoucang' color='red' /> : <Icon type="heart"/>
                  }
                </section>
              </section>
            </div>
          ) : (
            <div className='work-tool-modal view-by-self'>
              {
                customRenderItem && customRenderItem({index})
              }
              <span className='work-item-date'>2019-01-18</span>
              <span className='work-item-auth'>
                <Icon type="lock" theme="filled" />
                仅自己可见
              </span>
              <strong className={classNames('work-item-name', {hideCollaborators: !showCollaborators})}>午后对话-习作No.32</strong>
              {
                showCollaborators && (
                  <span className='multiple-collaborators'>
                    <Dropdown overlay={collaborators} placement='bottomLeft' trigger={['click']} onVisibleChange={this.onVisibleChange}>
                      <span className='dropdown-inner'>
                    多个协同者 {' '}
                        <Icon type="caret-down" />
                      </span>
                    </Dropdown>
                  </span>
                )
              }

              <span className='work-item-type'>装帧设计</span>
              <section className='view-and-like'>
                <span>
                  <Icon type="eye" />
                  7,444
                </span>
                <span>
                  <Icon type="like" />20
                </span>
              </section>
              {
                dropdown && dropdown.length && (
                  <section className='operation-of-work-item'>
                    <Dropdown overlay={menu} placement='bottomLeft' trigger={['click']} onVisibleChange={this.onVisibleChange}>
                      <span className='dropdown-inner'>
                    ...
                      </span>
                    </Dropdown>
                  </section>
                )
              }

            </div>
          )
        }

      </div>
    )
  }
}

export default WorkItem