// 服务端配置
const isDev = process.env.NODE_ENV !== 'production'
const port = isDev ? 80 : 8080

const baseURL = isDev ? '/api' : '/prod_api'

module.exports = {
  port,
  baseURL
}