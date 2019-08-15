const Koa  = require('koa')
const path  = require('path')
const Next = require('next')
const session = require('koa-session')
const Router = require('./router.js')
const bodyparser = require('koa-bodyparser')
const  koaProxy = require('./proxy')
const koaStatic = require('koa-static')
const { port } = require('./config')

const dev = process.env.NODE_ENV !== 'production'

const app = Next({ dev })

const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = new Koa()
  server.keys = ['mxh ssr app']
  server.
    // .use(auth())
    use(session({key: 'mxh'}, server)).
    use(async (ctx, next)=> {
      ctx.handle = handle
      await next()
    }).
    use(koaStatic(
      path.join(__dirname, '../static')
    )).
    use(Router.routes()).use(Router.allowedMethods()).
    // .use(authRouter())
    use(koaProxy()).
    use(bodyparser({
      enableTypes: ['json', 'form', 'text']
    })).
    use(async (ctx, next)=> {
      // ctx.handle = handle
      await handle(ctx.req, ctx.res)
      ctx.respond = false

    })

  server.listen(port, ()=>{
    console.log(`koa server listening on ${port}`)
  })
})
