import './footer.less'
import Link from 'next/link'
import { siteEmail } from '~/config'
export default props => {
  const { showTop = true, showBottom = true } = props
  return (
    <div className="basic-footer">
      {
        showTop && (
          <div className="basic-footer-top">
            <div className="footer-top-content">
              <div className='footer-logo fl'>
                <img src={ossBaseURL + '/common/footer-logo.png'} alt={'页脚logo'} />
              </div>
              <div className='footer-links fl'>
                <Link href='/'><a>关于我们</a></Link>
                <Link href='/'><a>用户协议</a></Link>
                <Link href='/'><a>帮助中心</a></Link>
                <Link href='/'><a>营销服务</a></Link>
                <Link href='/'><a>加入我们</a></Link>
                <Link href='/'><a>视觉中国</a></Link>
              </div>
            </div>
          </div>
        )
      }
      {
        showBottom && (
          <div className="basic-footer-bottom">
            <div className="footer-bottom-content">
              <section className='company copyright'>
                <span className='default-text'>华盖创意（天津）视讯科技有限公司</span>
                <span className='default-text'>津ICP备13002055号-2</span>
              </section>
              <section className='media'>
                <span className='default-text'>社交媒体</span>
                <span className='wechat'>
                  <img src={ossBaseURL + '/common/wechat.png'} />
                </span>
                <span className='weibo'>
                  <img src={ossBaseURL + '/common/weibo.png'} />
                </span>
              </section>
              <section className='email'>
                <span className='default-text'>{siteEmail}</span>
              </section>
              <section className='friend-link'>
                <span className='default-text'>友情链接</span>
                <a href="/" className='friend-link-item'>
                  <img src={ossBaseURL + '/common/veer-logo.png'} className='veer' alt="veer"/>
                </a>
                <a href="/" className='friend-link-item'>
                  <img src={ossBaseURL + '/common/500px-logo.png'} className='_500px' alt="500px"/>
                </a>
                <a href="/" className='friend-link-item'>
                  <img src={ossBaseURL + '/common/500px-logo.png'} className='shijue _500px' alt="视觉中国"/>
                </a>
              </section>
            </div>
          </div>
        )
      }
    </div>
  )
}