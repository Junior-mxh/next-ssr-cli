import './status-page.less'
const PageNotFound = (props) => {
  return (
    <div className={'pageNotFound'}>
      <div>
        <img src={ossBaseURL + '/common/404.png'} alt="页面没找到"/>
        <p className=''>
          <span>页面不见了，即刻返回</span>
          <a href="/">首页</a>
        </p>
      </div>
    </div>
  )
}
PageNotFound.getInitialProps = function () {
  return {
    noShadow: true
  }
}
export default PageNotFound