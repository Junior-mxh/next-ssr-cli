import React,{useState} from 'react'
// import Router from 'next/router'
import { withRouter } from 'next/router'
// import { actionCreators } from './store'
import { connect } from 'react-redux'

import  classnames from 'classnames'
import Link from 'next/link'
import './index.less'
class Retrieval extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isPhoneLogin:true
    }
  }
  render () {
    return(
      <div className='retrieval-wrapper'>
        {/* <span>{title}</span>*/}
        {/* <Button onClick={userLogin}>登陆</Button>*/}
        {/* <Link href='/center/232332/works'>*/}
        {/*  <Button>跳到个人中心</Button>*/}
        {/* </Link>*/}
        {/*<img src={ ossBaseURL+'/login/login-bg.png'} alt=""/>*/}
        <div className="retrieval-title">
          <div className="retrieval-logo">
            <img src={ossBaseURL+'/login/login-logo.png'} alt=""/>
            <span>密码找回</span>
          </div>
        </div>
        <div  className='retrieval-box'>
          <div className="select-bar">
            <span className={classnames({ selected: this.state.isPhoneLogin})}
                  onClick={this.shiftLoginMethod.bind(this,true)}
            >手机找回</span>
            <span className={classnames({ selected: !this.state.isPhoneLogin})}
                  style={{marginLeft:50}} onClick={this.shiftLoginMethod.bind(this,false)}
            >邮箱找回</span>
          </div>
          {
            this.state.isPhoneLogin ?
              <div className='input-bar'>
                <div className='input-item'>
                  <span className='icon-bar'>icon</span>
                  <input type="text" placeholder='请输入手机号' style={{width:430}}/>
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
              </div>:
              <div className='input-bar'>
                <div className='input-item'>
                  <span className='icon-bar'>icon</span>
                  <input type="text" placeholder='请输入邮箱/用户名' style={{width:430}}/>
                </div>
                <div className='input-item'>
                  <span className='icon-bar'>icon</span>
                  <input type="text" placeholder='请输入绑定邮箱' style={{width:430}}/>
                </div>
              </div>
          }
         {/* <div className='link-bar'>
            <span style={{marginRight:20}}>忘记密码</span>
            <span>注册</span>
          </div>*/}
          <div className='retrieval-btn'>
            下一步
          </div>

        </div>
        <div className='retrieval-footer'>
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
export default connect(mapState, mapDispatch)(withRouter(Retrieval))
