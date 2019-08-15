const withCss = require('@zeit/next-css')
const withLess = require('@zeit/next-less')
const webpack = require('webpack')
const path = require('path')
const theme = require('./theme')
if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {}
}
const nextConfig = {
  webpack (config, {buildId, dev, isServer, defaultLoaders}) {
    if (dev) {
      config.module.rules.push({
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      })
    }


    // 配置目录别名
    config.resolve.mainFiles = ['index']
    config.resolve.extensions = ['.js', '.json', '.jsx'] // 允许省略后缀
    config.resolve.alias['~'] = path.resolve(__dirname)
    config.resolve.alias['vcg'] = path.resolve(__dirname, 'components/vcg')
    config.devtool = 'cheap-module-eval-source-map'

    config.plugins.push(
      new webpack.DefinePlugin({
        // isServer, //服务端模块拿不到
        ossBaseURL: JSON.stringify('https://shijue-static-dev.oss-cn-beijing.aliyuncs.com/shijue')
      })
    )
    return config
  },
  // cssModules: true,
  lessLoaderOptions: {
    modifyVars: theme,
    javascriptEnabled: true
  }
}
module.exports = withCss(withLess(nextConfig))
