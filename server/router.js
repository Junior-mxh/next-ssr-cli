const Router = require('koa-router')
const router = new Router()
const userAuth = require('./auth')// 验证权限的中间件
const getUserInfo = require('./getUserInfo')
const redirect = require('../utils/server-redirect')


// 路由权重 暂定为 0无需登陆(登陆注册页，和其他游客也能进的外网页面)   1(普通用户能进)    2（管理员能进）   3（创建人能进）

// router.use(['/'],  getUserInfo())
router.get('/', getUserInfo())
router.get('/index', getUserInfo())

// router.get('/:page', getUserInfo())

// router.get('/login', getUserInfo())
// router.get('/register', getUserInfo())
// router.get('/retrieval', getUserInfo())
// router.get('/studio/login', getUserInfo())

router.get('/error/404', getUserInfo())
router.get('/error/500', getUserInfo())
router.get('/error/400', getUserInfo())

// 个人资料
router.get('/information/:userId/:module', getUserInfo(), async (ctx) => {
  let userId = ctx.params.userId || ctx.params[0]
  let module = ctx.params.module || ctx.params[0]
  ctx.req.params = {...ctx.req.params, userId, module}
  await ctx.handle(ctx.req, ctx.res, {
    pathname: '/information',
    query: ctx.query
  })
  ctx.respond = false
})
router.get('/information', async (ctx, next)=>{
  redirect(ctx, '/error/404')
  await next()
})
// 个人主页
router.get('/center/:userId/:module', getUserInfo(), async (ctx) => {
  let userId = ctx.params.userId || ctx.params[0]
  let module = ctx.params.module || ctx.params[0]

  ctx.req.params = {...ctx.req.params, userId, module}
  await ctx.handle(ctx.req, ctx.res, {
    pathname: '/center',
    query: ctx.query
  })
  ctx.respond = false
})
router.get('/center', async (ctx, next)=>{
  redirect(ctx, '/error/404')
  await next()
})


// 全站详情页
router.get('/detail/:userId', getUserInfo(), async (ctx) => {
  let userId = ctx.params.userId || ctx.params[0]
  // let module = ctx.params.module || ctx.params[0]

  ctx.req.params = {...ctx.req.params, userId}
  await ctx.handle(ctx.req, ctx.res, {
    pathname: '/detail',
    query: ctx.query
  })
  ctx.respond = false
})
router.get('/detail', async (ctx, next)=>{
  redirect(ctx, '/error/404')
  await next()
})





module.exports = router