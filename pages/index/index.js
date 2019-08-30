import React  from 'react'
import { withRouter } from 'next/router'
import Link from 'next/link'
import { Button } from 'antd'
import Head from '~/components/head'
import { connect } from 'react-redux'
import dynamic from 'next/dynamic'
// const UploadWorks = dynamic(() => import('~/components/common/upload-work'))
class Index extends React.Component {

  render () {
    const tdk = {
      title: '这是首页的标题',
      description: '这是首页的描述'
    }
    return (
      <div style={{width: '1000px', margin: '100px auto'}}>
        <Head {...tdk}/>
        <div>
          {/* <Link href='/login'>*/}
          {/*  <a>*/}
          {/*    <Button>这是首页, 登陆1</Button>*/}
          {/*  </a>*/}
          {/* </Link>*/}
          <Button onClick={()=> window.location.href='/login'}>这是首页, 登陆2</Button>
          <Link href='/center/132324324234211/works'>
            <a>
              <Button>这是首页, 点击跳转个人中心</Button>
            </a>
          </Link>
          <Link href='/information/132324324234211/fans'>
            <a>
              <Button>点击跳转个人资料</Button>
            </a>
          </Link>
          <Link href='/detail/132324324234211'>
            <a>
              <Button>点击跳转作品详情页</Button>
            </a>
          </Link>
          <Link href='/dsadadasd' as='/dsadsad'>
            <a>
              <Button>404</Button>
            </a>
          </Link>
        </div>
        {/* 作品上传测试 */}
        {/* <UploadWorks />*/}
      </div>
    )
  }
}
const mapState = (state) => ({
})

const mapDispatch = (dispatch) => ({

})
export default connect(mapState, mapDispatch)(withRouter(Index))
