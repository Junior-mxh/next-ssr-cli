export default [
  // {
  //   path: '/',
  //   // needToken: false,
  //   authType: 0  // 0游客（不需要token），1 注册普通会员（需要token 且authType大于等于1），2管理员（依次类推）， 3创建者
  // },
  {
    path: '/index',
    // needToken: false,
    authType: 0
  },
  {
    path: '/login',
    // needToken: false,
    authType: 0
  },
  {
    path: '/register',
    // needToken: false,
    authType: 0
  },
  {
    path: '/retrieval',
    // needToken: false,
    authType: 0
  },
  {
    path: '/center',
    // needToken: false,
    authType: 0
  },
  {
    path: '/information',
    // needToken: false,
    authType: 1
  },
  {
    path: '/studio/login',
    // needToken: false,
    authType: 0
  },
  {
    path: '/error/404',
    // needToken: false,
    authType: 0
  },
  {
    path: '/error/500',
    // needToken: false,
    authType: 0
  },
  {
    path: '/error/400',
    // needToken: false,
    authType: 0
  }
]