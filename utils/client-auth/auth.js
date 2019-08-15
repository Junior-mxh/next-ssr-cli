import Cookie from 'js-cookie'
import { parseCookies, setCookie, destroyCookie } from  'nookies'
import redirect  from '../redirect'
import axios from '../request'
import pathAuthMap from './routerMap'

// 用于统一路由拦截，包括1、用户详情的获取 2、检验用户是否有访问权限  和  3、页面是否需要校验token  的配置
// 1、校验是否有token 没有的话，哪些路由要重定向到login
// 2、在有token的情况下，请求用户详情接口，然后在with-redux里面注入，同时根据用户详情的权限判断哪些路由不能进入
const getUserInfo = async (ctx) => {
  let result = await axios({
    method: 'get',
    url: '/userInfo'
    // params: {},
    // customConfig: {}
  }, ctx)
  let userInfo = result.data.data
  return userInfo
}
export default async (ctx) => {
  const isServer =  typeof window === 'undefined'
  let path = ctx.ctx.pathname
  let token = ''
  let userInfo = {}
  // if( path === '/userInfo') {
  //   return
  // }
  if(isServer) {
    const nookies = parseCookies(ctx.ctx)
    token = nookies.token
  }else{
    token = Cookie.get('token')
  }
  let isInStudioPage = false
  if(path.startsWith('/studio')) {
    isInStudioPage = true
  }
  for(let i=0;i<pathAuthMap.length;i++) {
    let router = pathAuthMap[i]
    if(path === '/') {
      path = '/index'
    }
    if(router.path.startsWith(path)) {
      if(router.authType === 0) {
        // 直接跳转放行
        if(token) { // 如果有token就拿用户信息
          userInfo = await getUserInfo(ctx)
          return {userInfo, isInStudioPage}
        }else{
          return {userInfo, isInStudioPage}
        }
      }
      if(router.authType > 0 ) {
        // 验证是否有token,没有就跳到登陆页
        // 有token就请求用户详情接口，根据用户详情的权限判断是否能进入这个路由，不能就return，能就跳转
        if(!token) {
          redirect(ctx.ctx, '/login')
        }else{
          userInfo = await getUserInfo(ctx)
          if(userInfo.userType < router.authType) { // 用户的权限小于路由权限
            redirect(ctx.ctx, '/error/400')// 定向到无权限的页面
            return
          }else{
            return {userInfo, isInStudioPage}
          }
        }
      }
    }
  }

}
