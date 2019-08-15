import React from 'react'
// import Router from 'next/router'
import { withRouter } from 'next/router'
// import Link from 'next/link'
import { Button } from 'antd'
// import Head from '~/components/head'
import { connect } from 'react-redux'
import Link from 'next/link'

const Login = (props) => (
  <div>
    <div>工作室 登陆页</div>
    {/* <span>{process.env.NODE_ENV }</span>*/}
    {/* <span>counter:{counter}</span>*/}
    {/* <span>username:{username}</span><br/>*/}

    {/* <input type='text' value={username} onChange={(e)=> rename(e.target.value)} />*/}
    {/* <button onClick={()=> add(counter)}>do add </button>*/}

  </div>
)

const mapState = (state) => ({
  // title: state.login.name,
  // username: state.user.username
})

const mapDispatch = (dispatch) => ({
  userLogin () {
    // dispatch(actionCreators.userLogin())
  }
  // rename(name){
  //     dispatch({type:'UPDATE_USERNAME',name})
  // }
  // getDetail(id) {
  //     dispatch(actionCreators.getDetail(id))
  // }
})
export default connect(mapState, mapDispatch)(withRouter(Login))
