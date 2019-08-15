const httpProxy = require('http-proxy-middleware')
const k2c = require('koa2-connect')

// 通用中间件写法
module.exports = function (options) {
  // 配置处理

  return async (ctx, next) => {
    // 中间件逻辑...
    if (ctx.url.startsWith('/api')) {
      // 匹配有api字段的请求url
      ctx.respond = false
      // 绕过koa内置对象response ，写入原始res对象，而不是koa处理过的response
      await k2c(httpProxy({
        target: 'http://www.mockhttp.cn/mock/api', // https://www.mockhttp.cn
        changeOrigin: true,
        // autoRewrite: true,
        pathRewrite: {'^/api': ''},
        secure: false // 避免请求https的时候要证书
        // headers: {},
        // onProxyReqWs(proxyReq, req, res) {
        //     // add custom header to request
        //     proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
        //
        //     // console.table(proxyReq.headers)
        //     // or log the req
        // },
      }))(ctx, next)
    }
    await next()
  }
}







