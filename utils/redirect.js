const Router = require('next/router')

const redirect = (ctx, target) => {
  let redirectUrl = ''
  if(target === '/login') {
    redirectUrl = ctx.asPath
  }
  if (ctx && ctx.res) {
    // server
    // 303: "See other"
    if(redirectUrl) {
      ctx.res.writeHead(303, { Location: `${target}?redirectUrl=${encodeURIComponent(redirectUrl)}`})
    }else{
      ctx.res.writeHead(303, { Location: `${target}`})
    }
    ctx.res.end()
  } else {
    // In the browser, we just pretend like this never even happened ;)
    Router.replace(target)
  }
}
export default redirect