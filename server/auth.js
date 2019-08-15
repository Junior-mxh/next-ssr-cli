const { parseCookies, setCookie, destroyCookie } = require('nookies')
const redirect = require('../utils/server-redirect')
const axios = require('../utils/request')
// 验证是否有token，没有直接跳登陆页
// 获取用户详情数据，判断用户是否能进这个页面

module.exports =  () => {
  return async (ctx, next) => {
    const { token } = parseCookies(ctx)
    if(token) {
      let result = await axios({
        method: 'get',
        url: '/getUserInfo'
        // params: {},
      // customConfig: {}
      }, ctx)
      let userInfo = result.data.data
      ctx.req.params = { userInfo }
    }else{
      redirect(ctx, '/login')
    }
    await  next()
  }
}