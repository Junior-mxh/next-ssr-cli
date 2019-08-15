import React from 'react'
import './index.less'
import {Button, Switch, Modal, Popover} from 'antd'
import {VcgIcon} from 'vcg'
import { connect } from 'react-redux'
import { actionCreators } from '~/store/upload-work'
import { debounce } from 'throttle-debounce'
import classNames from 'classnames'


class NewWorkSetting extends React.Component {
  constructor (props) {
    super(props)
    this.syncValue = debounce(400, false, this.syncValue)
  }
  state = {
    showWorks: false,
    showCoCreator: false,
    chooseImgVisible: false,
    creatorKeyword: ''
  }

  syncValue (value) {
    this.props.queryCreator(value)
  }
  getCreators = (e) => {
    e.persist()
    this.setState({creatorKeyword: e.target.value}, () => {
      this.syncValue(e.target.value)
    })
  }

  render () {
    const { showWorks, showCoCreator, marksVisible, creatorKeyword, chooseImgVisible } = this.state
    const {
      updateEditState,
      worksList, selectWorkItem, selectedWorksName,
      selectedCreators, resultCreators, selectCreator
    } = this.props

    const commonModalProps = {
      className: 'reset-close-position img-list-modal', visible: chooseImgVisible, keyboard: false,
      destroyOnClose: true, title: null, footer: null,
      width: 760, bodyStyle: {padding: '40px 25px'},
      onCancel: () => this.setState({chooseImgVisible: false})
    }

    const timestampTip = (
      <span style={{fontSize: '12px'}}>
        <b>时间戳（TSA）</b>
        <span style={{fontWeight: 300}}>
          是由国家授时中心推出 <br/>的为创作人提供原创证明的工具，记录作 <br/>品发表的时间和创作人信息，保护作品版 <br/>权归属。
        </span>
      </span>
    )
    return (
      <div className='work-setting'>
        <Modal {...commonModalProps}>
          <strong className='choose-title'>选择要使用时间戳的版权图片</strong>
          <small className='sub-title'>选择 0 枚  账户余额 <span>7枚</span></small>
          <small className='sub-title' style={{margin: '15px 0 20px'}}>时间戳数量不足，请在购买后再在修改作品时继续添加哦</small>
          {/* <hr/>*/}
          <div className="img-list">
            {
              Array.apply(null, {length: 32}).map((o, i) => (
                <section key={i} className={classNames({selected: i === 0})}>
                  <span className='select-tag'>
                    <img className='work-image' src={ossBaseURL + '/center/work-unselected.png'} alt="作品图片"/>
                  </span>
                  <img className='work-image' src={ossBaseURL + '/center/work-item.png'} alt="作品图片"/>
                </section>
              ))
            }
          </div>
          <div className='buttons'>
            <Button style={{marginRight: '70px'}}>取消</Button>{' '}
            <Button type='primary' onClick={() => this.setState({chooseImgVisible: false})}>完成</Button>
          </div>
        </Modal>
        {marksVisible && <i className="mask" onClick={() => this.setState({marksVisible: false, showWorks: false, showCoCreator: false})}/>}
        <div className='setting-item'>
          <span className='item-icon'>
            <VcgIcon type='shangchuanbiaoqian' />
          </span>
          <span className='item-input'>
            <input type="text" placeholder='添加标签，用回车分隔'/>
          </span>
        </div>
        <div className='setting-item creator-setting'>
          <span className='item-icon'>
            <VcgIcon type='shangchuanxietongchuangzuoren' />
          </span>
          <div className="user-input">
            <div className="creator-items">
              {
                selectedCreators.length > 0 && selectedCreators.map((creator, index) => (
                  <span key={index} className='creator-select-item text-overflow'>
                    <VcgIcon color='#BFBFBF' type='tianjiabiaoqing' />{' '}
                    {creator.name}
                  </span>
                ))
              }
            </div>
            <div className='dropdown-box'>
              <span className="item-input">
                <input
                  value={creatorKeyword}
                  type="text" placeholder='协同创作人，用回车分隔'
                  onChange={this.getCreators}
                  onClick={() => this.setState({showCoCreator: true, marksVisible: true})}/>
              </span>
              {
                showCoCreator && resultCreators.length > 0 &&  (
                  <div className='item-dropdown' style={{width: '250px', left: '0px', height: resultCreators.length * 60 + 32 + 'px'}}>
                    {resultCreators.map((item, index) => {
                      return (
                        <section key={index} className='creator-item' onClick={() => selectCreator({...item, index})}>
                          <img src={item.workImg} alt={item.name}/>
                          <span className='creator-name' dangerouslySetInnerHTML={{__html: item[creatorKeyword === '' ? 'name' : 'htmlName']}} />
                          {
                            item.selected && (
                              <span className='select-icon'>
                                <VcgIcon type='xuanzhong'/>
                              </span>
                            )
                          }
                        </section>
                      )
                    })}
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <div className='setting-item'>
          <span className='item-icon'>
            <VcgIcon type='shangchuanbanquan' />
          </span>
          <span className='item-label'>
            版权
          </span>
          <span className='item-switch'>
            <span className='item-switch-text'>原创</span><Switch defaultChecked />
          </span>
        </div>
        <div className='setting-item'>
          <span className='item-icon'>
            <VcgIcon type='shangchuanjiaruzuopinji' />
          </span>
          <span className='item-input'>
            <input
              type="text" value={selectedWorksName}
              onChange={() => {}}
              onFocus={() => this.setState({showWorks: true, marksVisible: true})}
              placeholder='加入作品集'/>
          </span>
          <span className='item-switch' style={{cursor: 'pointer'}}>
            <VcgIcon
              style={{
                transform: `rotateX(${showWorks ? '180deg' : '0deg'})`,
                transition: 'transform ease 0.3s'
              }}
              type='xiala' width='30px' size='12px'
              onClick={() => this.setState({showWorks: true, marksVisible: true})}/>
          </span>
          {
            showWorks && (
              <div className='item-dropdown'>
                {worksList.map((work, index) => {
                  return (
                    <section onClick={() => selectWorkItem({...work, index})} key={index} className='_work-list-item'>
                      <img src={work.workImg} alt={work.name}/>
                      <span className='work-name'>{work.name}</span>
                      {
                        work.selected && (
                          <span className='select-icon'>
                            <VcgIcon type='xuanzhong'/>
                          </span>
                        )
                      }
                    </section>
                  )
                })}
              </div>
            )
          }

        </div>
        <div className='setting-item'>
          <span className='item-icon'>
            <VcgIcon type='shangchuanyinsi' />
          </span>
          <span className='item-label'>
            隐私设置
          </span>
          <span className='item-switch'>
            <span className='item-switch-text'>公开</span><Switch defaultChecked />
          </span>
        </div>
        <div className='setting-item'>
          <span className='item-icon'>
            <VcgIcon type='shangchuanshuiyin' />
          </span>
          <span className='item-label'>
            打个水印
          </span>
          <span className='item-switch'>
            <span className='item-switch-text'>昵称</span><Switch defaultChecked />
          </span>
        </div>
        <div className='setting-item'>
          <span className='item-icon'>
            <VcgIcon type='shangchuanshijianchuo' />
          </span>
          <span className='item-label'>
            <Popover content={timestampTip} placement="rightBottom">
              <span>时间戳</span> {' '}
            </Popover>
            <small style={{color: '#bfbfbf', fontSize: '16px'}}>已选择0张图</small>
          </span>
          <span className='item-switch' style={{cursor: 'pointer'}} onClick={() => this.setState({chooseImgVisible: true})}>
            <span style={{color: '#bfbfbf', fontSize: '16px'}}>选择图片</span>
            <VcgIcon type='jinru' width='30px' size='12px'/>
          </span>
        </div>
        <div className='setting-item'>
          <span className='item-icon'>
            <VcgIcon type='shangchuanfengmian'/>
          </span>
          <span className='item-label'>
            作品封面
          </span>
        </div>
        <div className="work-post-box">
          <span className='edit-post-icon'>
            <VcgIcon type='shangchuanbianjitupian'/>
          </span>
          <img className='work-image' src={ossBaseURL + '/center/work-item.png'} alt="作品图片"/>
          <span className='post-size'>xxxxxxxxxx尺寸</span>
        </div>
        <div className="work-operation-buttons">
          <Button type="link" style={{color: '@theme-color'}} onClick={() => updateEditState(false)}>上一步</Button>
          <Button type="link" style={{color: '@theme-color'}} onClick={() => window.open('/detail/3123')}>预览</Button>
          <Button type='primary' shape='round' style={{width: '130px', marginLeft: '30px'}}>发布</Button>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  newWorksEditComplete: state.workUpload.newWorksEditComplete,
  selectedWorksName: state.workUpload.selectedWorksName,
  creators: state.workUpload.creators,
  selectedCreators: state.workUpload.selectedCreators,
  resultCreators: state.workUpload.resultCreators,
  worksList: state.workUpload.worksList
})
const mapDispatch = dispatch => ({
  updateEditState (state) {
    dispatch(actionCreators.updateEditState(state))
  },
  selectWorkItem (work) {
    dispatch(actionCreators.selectWorkItem(work))
  },
  queryCreator (keyword) {
    dispatch(actionCreators.queryCreator(keyword))
  },
  selectCreator (item) {
    dispatch(actionCreators.selectCreator(item))
  }
})
export default connect(mapState, mapDispatch)(NewWorkSetting)