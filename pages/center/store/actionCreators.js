import * as constants from './constants'

// 初始化用户中心数据
const changeInitData = (initData) => ({type: constants.INIT_DATA, initData})
// 回收站选择操作
export const selectItem = ({index}) => ({ type: constants.SELECT_ITEM, item: { index }})
export const recycleBinClearSelected = () => ({ type: constants.CLEAR_RECYCLE_BIN_SELECTED})
export const viewCurrentCollect = (current) => ({ type: constants.VIEW_CURRENT_COLLECT, current})
export const selectAllChange = (checked) => ({ type: constants.SELECT_ALL_CHANGE, checked})


export const setUserCenterData = (data) => {
  // ajax 取模块数据，读map
  let {userId, currentModule, isSelf, query} = data
  let tabList = isSelf ? constants.tabListOfSelf : constants.tabListOfVisitor
  let tabIndex = tabList.findIndex(tab => tab.value === currentModule)
  tabIndex = (tabIndex !== -1) ? +tabIndex : 0
  let currentTab = tabList[tabIndex] || {}
  let subTabList = []
  let subTabIndex = -1
  if(currentTab.subTabList && currentTab.subTabList.length > 0 ) {
    subTabList = currentTab.subTabList
    subTabIndex = subTabList.findIndex(tab => tab.value === query.type)
  }
  let initData = {
    type: query.type,
    userId, tabIndex, subTabIndex, tabList, subTabList,
    currentModule, query, isSelf,
    currentComponentData: {}
  }
  return  async dispatch => await dispatch(changeInitData(initData))
}
