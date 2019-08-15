// 客户端配置
const isDev = process.env.NODE_ENV !== 'production'
const baseURL = isDev ? '/api' : '/prod_api'
const ossBaseURL = 'https://shijue-static-dev.oss-cn-beijing.aliyuncs.com/shijue'
const siteEmail = 'designerservice@vcg.com'
module.exports =  {
  baseURL, ossBaseURL, siteEmail
}