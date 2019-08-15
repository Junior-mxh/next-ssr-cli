import React,{useState} from 'react'
// import Router from 'next/router'
import { withRouter } from 'next/router'
// import { actionCreators } from './store'
import { connect } from 'react-redux'
import { Checkbox } from 'antd'
import  classnames from 'classnames'
import Link from 'next/link'
import './index.less'
class Register extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isPhoneLogin:true
    }
  }
  render () {
    return(
      <div className='register-wrapper'>
        {/* <span>{title}</span>*/}
        {/* <Button onClick={userLogin}>登陆</Button>*/}
        {/* <Link href='/center/232332/works'>*/}
        {/*  <Button>跳到个人中心</Button>*/}
        {/* </Link>*/}
        {/*<img src={ ossBaseURL+'/login/login-bg.png'} alt=""/>*/}
        <div className="register-title">
          <div className="register-logo">
            <img src={ossBaseURL+'/login/login-logo.png'} alt=""/>
            <span>注册</span>
          </div>
          <div className="register-tip">500px会员可直接<a href="">登录</a></div>
        </div>
        <div  className='register-box'>

          <div className='input-bar'>
            <div className='input-item'>
              <span className='icon-bar'>icon</span>
              <input type="text" placeholder='请输入手机号' style={{width:430}}/>
            </div>

            <div className='input-item'>
              <span className='icon-bar'>icon</span>
              <input type="text" placeholder='请输入昵称' style={{width:430}}/>
            </div>
            <div className='input-item'>
              <span className='icon-bar'>icon</span>
              <input type="text" placeholder='请输入用户名' style={{width:430}}/>
            </div>
            <div className='input-item'>
              <span className='icon-bar'>icon</span>
              <input type="text" placeholder='请输入密码' style={{width:430}}/>
            </div>
            <div className='code-wrapper'>
              <input type="text"  className='code-input' placeholder='请输入验证码'/>
              <div className='code-bar'>
                获取验证码
              </div>
            </div>
          </div>
          <div className='tip-wrapper clearfix'>
            <div className='ruler-bar'>
              <Checkbox/> 我已阅读并承诺遵守<a>服务协议</a>和<a>隐私条款</a>
            </div>
            <div className='link-bar'>
              <span style={{marginRight:20}}>已有账户？</span>
              <span>登陆</span>
            </div>
          </div>
          <div className='register-btn'>
            注册
          </div>
        </div>
        <div className='register-footer'>
          <div>图片来源于VEER</div>
          <div>苏公网安备 32059002002486号</div>
          <div>津ICP备13002055号-2 华盖创意（天津）视讯科技有限公司</div>
        </div>
      </div>
    )
  }
  shiftLoginMethod =(val)=>{
    this.setState({
      isPhoneLogin:val
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
export default connect(mapState, mapDispatch)(withRouter(Register))
