import React, {useState} from 'react'
// import Router from 'next/router'
import { withRouter } from 'next/router'
import { actionCreators } from './store'
import { connect } from 'react-redux'

import  classnames from 'classnames'
import Link from 'next/link'
import './index.less'
class Login extends React.Component {
  static getInitialProps (context) {

  }
  constructor (props) {
    super(props)
    this.state = {
      isPhoneLogin: true
    }
  }
  render () {
    return(
      <div className='login-wrapper'>
        {/* <span>{title}</span>*/}
        {/* <Button onClick={userLogin}>登陆</Button>*/}
        {/* <Link href='/center/232332/works'>*/}
        {/*  <Button>跳到个人中心</Button>*/}
        {/* </Link>*/}
        {/* <img src={ ossBaseURL+'/login/login-bg.png'} alt=""/>*/}
        <div className="login-title">
          <div className="login-logo">
            <img src={ossBaseURL+'/login/login-logo.png'} alt=""/>
            <span>登录</span>
          </div>
          <div className="login-tip">500px会员可直接登录</div>
        </div>
        <div  className='login-box'>
          <div className="select-bar">
            <span className={classnames({ selected: this.state.isPhoneLogin})} onClick={this.shiftLoginMethod.bind(this, true)}>手机登录</span>
            <span className={classnames({ selected: !this.state.isPhoneLogin})}  style={{marginLeft: 50}} onClick={this.shiftLoginMethod.bind(this, false)}>邮箱/用户名</span>
          </div>
          {
            this.state.isPhoneLogin ?
              <div className='input-bar'>
                <div className='input-item'>
                  <span className='icon-bar'>icon</span>
                  <input type="text" placeholder='请输入手机号' style={{width: 430}}/>
                </div>
                <div className='code-wrapper'>
                  <input type="text"  className='code-input' placeholder='请输入验证码'/>
                  <div className='code-bar'>
                    获取验证码
                  </div>
                </div>
              </div>:
              <div className='input-bar'>
                <div className='input-item'>
                  <span className='icon-bar'>icon</span>
                  <input type="text" placeholder='请输入邮箱/用户名' style={{width: 430}}/>
                </div>
                <div className='code-wrapper'>
                  <input type="text"  className='code-input' placeholder='请输入验证码'/>
                  <div className='num-code-bar'>
                   2233
                  </div>
                </div>
                <div className='input-item clearfix' style={{marginTop: 20}}>
                  <span className='icon-bar'>icon</span>
                  <input type="text" style={{width: 430}}/>
                </div>
              </div>
          }
          <div className='link-bar'>
            <span style={{marginRight: 20}}>忘记密码</span>
            <span>注册</span>
          </div>
          <div className='login-btn'>
            登陆
          </div>
          <div className='login-line'>
            <span className='dashed'></span>
            <span className='or'>or</span>
            <span className='dashed'></span>
          </div>
          <div className='icon-wrapper'>
            <div className='icon-item'>
            </div>
            <div className='icon-item' style={{marginLeft: 50}}>
            </div>
          </div>
        </div>
        <div className='login-footer'>
          <div>图片来源于VEER</div>
          <div>苏公网安备 32059002002486号</div>
          <div>津ICP备13002055号-2 华盖创意（天津）视讯科技有限公司</div>
        </div>
      </div>
    )
  }
  shiftLoginMethod =(val)=>{
    this.setState({
      isPhoneLogin: val
    })
  }

}


const mapState = (state) => ({
  title: state.login.name
  // username: state.user.username
})

const mapDispatch = (dispatch) => ({
  userLogin () {
    dispatch(actionCreators.userLogin())
  }
  // rename(name){
  //     dispatch({type:'UPDATE_USERNAME',name})
  // }
  // getDetail(id) {
  //     dispatch(actionCreators.getDetail(id))
  // }
})
export default connect(mapState, mapDispatch)(withRouter(Login))
