
export const CHANGE_TITLE = 'LOGIN/CHANGE_TITLE'
export const INIT_DATA = 'INFORMATION/INIT_DATA'

export const tabList_self = [
  { name: '我的创作', value: 'works', url: ''},
  { name: '我的粉丝', value: 'fans', url: ''},
  { name: '我的关注', value: 'follow', url: '',
    subTabList: [
      { name: '关注的人', value: 'default', url: ''},
      { name: '工作室', value: 'studio', url: ''},
      { name: '活动', value: 'activity', url: ''}
    ]
  },
  { name: '资料与帐号', value: 'account', url: '',
    subTabList: [
      { name: '个人资料', value: 'default', url: ''},
      { name: '兴趣偏好', value: 'preference', url: ''},
      { name: '账户管理', value: 'manage', url: ''}
    ]},
  {
    name: '时间戳', value: 'timestamp', url: '', query: '?type=accountInfo',
    subTabList: [
      { name: '账户信息', value: 'accountInfo' },
      { name: '购买记录', value: 'buyHistory' },
      { name: '使用记录', value: 'useHistory' }
    ]
  }
]

export const tabList_visitor = [
  { name: '我的粉丝', value: 'fans', url: ''},
  { name: '我的关注', value: 'follow', url: '',
    subTabList: [
      { name: '关注的人', value: 'default', url: ''},
      { name: '工作室', value: 'studio', url: ''},
      { name: '活动', value: 'activity', url: ''}
    ]
  }
]