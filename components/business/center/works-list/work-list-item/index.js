import React from 'react'
import { Icon, Menu, Dropdown, message, Skeleton } from 'antd'
import classNames from 'classnames'
import './index.less'
class WorkListItem extends React.Component {

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

  // 编辑作品集
  editWorkList ({key}) {
    message.info('编辑作品集')
    this.setState({visible: false})
  }
  // 删除作品集
  deleteWorkList ({key}) {
    message.info('删除作品集')
    this.setState({visible: false})
  }
  render () {
    const { active, isSelf } = this.props
    const { visible, loading } = this.state
    const menu = (
      <Menu onClick={({key}) => this[key]({key})}>
        <Menu.Item key="editWorkList"><Icon type="edit" />编辑作品集</Menu.Item>
        <Menu.Item key="deleteWorkList"><Icon type="delete" />删除作品集</Menu.Item>
      </Menu>
    )

    return (
      <>
        <div className={classNames('work-list-item', { active: active || visible })}>
          <Skeleton active paragraph={{rows: 6}} loading={loading}>
            <div>
              <div className='work-img-wrapper'>
                <section>
                  <img className='work-list-image' src={ossBaseURL + '/center/work-item.png'} alt="作品图片"/>
                </section>
                <section>
                  <img className='work-list-image' src={ossBaseURL + '/center/work-item.png'} alt="作品图片"/>
                  <img className='work-list-image' src={ossBaseURL + '/center/work-item.png'} alt="作品图片"/>
                  <img className='work-list-image' src={ossBaseURL + '/center/work-item.png'} alt="作品图片"/>
                </section>
              </div>
            </div>

            <div className='work-list-tool-modal view-by-self'>
              <span className='work-list-item-date'>2019-01-18 {' '}创建</span>
              <span className='work-list-item-auth'>
                <Icon type="lock" theme="filled" />
                {/* 仅自己可见*/}
              </span>
              <strong className='work-list-item-name'>午后对话-习作No.32</strong>
              <span className='work-list-number'>32件</span>
              <section className='operation-of-work-list-item'>
                <Dropdown overlay={menu} placement='bottomLeft' trigger={['click']} onVisibleChange={this.onVisibleChange}>
                  <span className='dropdown-inner'>
                    ...
                  </span>
                </Dropdown>
              </section>
            </div>
          </Skeleton>
        </div>
      </>
    )
  }
}

export default WorkListItem