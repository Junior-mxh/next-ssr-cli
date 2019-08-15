import axios from '~/utils/request'
import * as constants from './constants'
import Cookie from 'js-cookie'

const changeInitData = (initData) => ({
  type: constants.INIT_DATA,
  initData
})

export const setInformationData = (data) => {
  // ajax 取模块数据，读map
  let {userId, currentModule, isSelf, query}  =  data
  let tabList = isSelf ? constants.tabList_self : constants.tabList_visitor
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
    userId,
    tabIndex,
    subTabIndex,
    tabList,
    subTabList,
    currentModule,
    query,
    // currentComponentData: data,
    isSelf
  }
  return  async (dispatch) => {
    await dispatch(changeInitData(initData))
  }
}

// export const userLogin = () => {
//   return  async (dispatch) => {
//     const result = await axios({
//       method: 'post',
//       url: '/login',
//       params: {
//         name: 'mxh',
//         age: 18
//       }
//     })
//     Cookie.set('token', result.data.data.token)
//     dispatch(changeTitle(result.data.data.token))
//   }
// }
