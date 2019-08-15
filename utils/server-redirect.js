const Router = require('next/router')

const redirect = (ctx, target) => {
  let redirectUrl = ''
  if(target === '/login') {
    redirectUrl = ctx.asPath
  }
  if (ctx && ctx.res) {
    if(redirectUrl) {
      ctx.res.writeHead(303, { Location: `${target}?redirectUrl=${encodeURIComponent(redirectUrl)}`})
    }else{
      ctx.res.writeHead(303, { Location: `${target}`})
    }
    ctx.res.end()
  } else {
    Router.replace(target)
  }
}
module.exports =  redirect