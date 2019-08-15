import React, {useState} from 'react'
import '../index.less'
import { VcgIcon, CountInput } from 'vcg'
import { Button, message } from 'antd'

const aboutList = [
  {icon: 'shijianchuojieshao1', text: <span>基于联合信任时间戳服务中心<br/>对创作作品的存在性和<br/>内容完整性进行<b>证据固定</b></span>, style: {marginRight: '47px'}},
  {icon: 'shijianchuojieshao', text: <span><b>保护原创视觉作品</b><br/>为设计师提供更好的<br/>创作、展示、交流平台</span>, style: {marginRight: '61px'}},
  {icon: 'shijianchuojieshao2', text: <span><b>高效、便捷、醒目</b><br/>的在线时间戳加盖流程</span>, style: {marginRight: '68px'}},
  {icon: 'shijianchuojieshao3', text: <span>提供国家版权局出具的<br/><b>高效、便捷、醒目</b>作品登记证书</span>}
]

const buyOptions = [
  {title: '单独购买', defaultCount: 1, unitPrice: 10, unitCount: null},
  {title: '特惠套餐一', defaultCount: 1, unitPrice: 95, unitCount: 10},
  {title: '特惠套餐二', defaultCount: 1, unitPrice: 900, unitCount: 100}
]



class AccountInfo extends React.Component {
  state = {
    currentIndex: null,
    count: 1,
    showTips: false
  }
  handleBuyItem (item) {
    message.info(`选择了${this.state.count}个${item.title}`)
  }
  handleCountChange (count, currentIndex) {
    this.setState({currentIndex, count})
  }
  render () {
    const { showTips } = this.state
    return (
      <>
        <blockquote className='about-timestamp'>
          <img className='tsa-logo' src={ossBaseURL + '/center/tsa-logo.png'} alt="TSA-版权保护logo"/>
          <section className='tsa-info'>
            <strong>时间戳#你的原创印记</strong>
            <span>时间戳（TSA）是由国家授时中心推出的为创作人提供原创证明的工具，记录作品发表的时间和创作人信息，保护作品版权归属。一个时间戳用于一张图片，永久有效。</span>
          </section>
        </blockquote>
        <div className='clearfix' style={{marginBottom: '49px'}}>
          {
            aboutList.map((about, index) => (
              <section key={index} className='fl about-item'>
                <VcgIcon type={about.icon} className='tsa-icon'/>
                {/* <img className='tsa-logo' src={ossBaseURL + '/center/tsa-logo.png'} alt="TSA-版权保护logo"/>*/}
                <p>{about.text}</p>
              </section>
            ))
          }
        </div>
        <div className='account-user-info'>
          {
            showTips && (
              <section className='account-info-tips'>
                通过实名认证，可以确保你的账户安全。账户的实名关系保证了你 <br/>在版权登记的合法性，保障你的合法权益。
              </section>
            )
          }
          <section className='user-detail-info'>
            <strong className='info-title'>个人信息
              <small
                style={{transform: 'translateX(10px)', display: 'inline-block', cursor: 'pointer'}}
                onMouseLeave={() => this.setState({showTips: false})}
                onMouseEnter={() => this.setState({showTips: true})}>已实名</small></strong>
            <p>
              <span>类型:</span>
              <span>个人</span>
            </p>
            <p>
              <span>姓名:</span>
              <span>小明</span>
            </p>
            <p>
              <span>身份证:</span>
              <span>31009877665544321</span>
            </p>
          </section>
          <section className='account-detail-info'>
            <strong className='info-title'>账户信息</strong>
            <p className='clearfix'>
              <img src={ossBaseURL + '/center/tsa-logo.png'} alt="TSA-版权保护logo"/>
              <span>账户剩余可用时间戳 <span className='highlight'>10</span>个, <a href="/" className='highlight'>查看购买记录</a></span>
            </p>
          </section>
        </div>
        <div className='buyOptions clearfix'>
          {
            buyOptions.map((option, index) => (
              <div key={index}>
                <strong>{option.title}</strong>
                <div>
                  <CountInput defaultCount={option.defaultCount} onChange={count => this.handleCountChange(count, index)} />
                  <section>
                    <b>{option.unitPrice}元/{option.unitCount}枚</b>
                    <Button onClick={() => this.handleBuyItem(option)} size='small' type='primary' shape='round' style={{height: '26px'}}>购买</Button>
                  </section>
                </div>
              </div>
            ))
          }
        </div>
      </>
    )
  }
}
export default AccountInfo