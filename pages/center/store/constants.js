export const INIT_DATA = 'CENTER/INIT_DATA' // 初始化用户中心
export const SELECT_ITEM = 'CENTER/SELECT_ITEM' // 回收站选择当前作品
export const CLEAR_RECYCLE_BIN_SELECTED = 'CENTER/CLEAR_RECYCLE_BIN_SELECTED' // 回收站清空当前选择
export const VIEW_CURRENT_COLLECT = 'CENTER/VIEW_CURRENT_COLLECT' // 查看当前收藏夹
export const SELECT_ALL_CHANGE = 'CENTER/SELECT_ALL_CHANGE' // 回收站全选操作
// 自己查看自己个人中心的tab
export const tabListOfSelf = [
  {
    name: '作品', value: 'works', url: '', query: '?type=default',
    subTabList: [
      { name: '我的作品', value: 'default' },
      { name: '我的作品集', value: 'worksList' },
      { name: '回收站', value: 'recycleBin' },
      { name: '我的收藏', value: 'collect' },
      { name: '我的点赞', value: 'giveALike' }
    ]
  },
  { name: '工作室', value: 'studio', url: '', query: '' },
  {
    name: '活动', value: 'activity', url: '', query: '?type=join',
    subTabList: [
      { name: '我参与的', value: 'join' },
      { name: '我发起的', value: 'begin' }
    ]
  },
  { name: '签约', value: 'contract', url: '', query: '' },
  {
    name: '时间戳', value: 'timestamp', url: '', query: '?type=accountInfo',
    subTabList: [
      { name: '账户信息', value: 'accountInfo' },
      { name: '购买记录', value: 'buyHistory' },
      { name: '使用记录', value: 'useHistory' }
    ]
  },
  { name: '通知', value: 'notification', url: '', query: '' }
]

// 别人查看个人中心的tab
export const tabListOfVisitor = [
  { name: '作品', value: 'works', url: '', query: '?type=default'},
  { name: '作品集', value: 'worksList', url: '', query: ''},
  { name: '工作室', value: 'studio', url: '', query: '' },
  {
    name: '活动', value: 'activity', url: '', query: '?type=join',
    subTabList: [
      { name: '我参与的', value: 'join' },
      { name: '我发起的', value: 'begin' }
    ]
  },
  { name: '收藏', value: 'collect', url: '', query: '' },
  { name: '点赞', value: 'giveALike', url: '', query: ''}
]