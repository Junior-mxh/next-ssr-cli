const axios = require('axios')
const Cookie = require('js-cookie')
const { parseCookies, setCookie, destroyCookie } = require('nookies')
const { baseURL } = require('../config/index')


module.exports = ({method='GET', url, params={}, customConfig = {}}, ctx) => {
  const isServer =  typeof window === 'undefined' // 区分服务端和客户端渲染
  const isDev = process.env.NODE_ENV === 'development'  // 区分开发和生产环境
  axios.defaults.baseURL = baseURL

  // 创建axios实例
  const instance = axios.create({ timeout: 1000 * 12})
  // 设置post请求头
  // instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'


  /**
     * 请求拦截器
     *
     */
  instance.interceptors.request.use(config => {   //

    // 服务端渲染和客户端渲染拿token 的方式不同
    let token = ''
    if(isServer && ctx) {
      const nookies = parseCookies(ctx.ctx)
      token = nookies.token
    }
    if(!isServer) {
      token = Cookie.get('token')
    }


    config = {
      ...config,
      ...customConfig
    }
    // token && (config.headers.token = token)
    return config
  },
  error => Promise.error(error)
  )

  /**
     * 响应拦截器
     *
     */
  instance.interceptors.response.use(
    // 请求成功
    res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
    // 请求失败
    error => {
      const { response } = error
      if (response) {
        // 请求已发出，但是不在2xx的范围
        // errorHandle(response.status, response.data.message);
        return Promise.reject(response)
      } else {
        // 处理断网的情况
        // eg:请求超时或断网时，更新state的network状态
      }
    })

  let data = {}
  if( method.toLowerCase() === 'get') {
    data = {
      params: params
    }
  }
  if( method.toLowerCase() === 'post') {
    data = {
      data: params
    }
  }
  return new Promise((resolve, reject) => {
    instance({
      method: method,
      url: url,
      ...data
    }).then(res=>{
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
  })
}