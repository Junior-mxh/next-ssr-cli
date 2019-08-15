import { fromJS } from 'immutable'
import * as constants from './constants'
const defaultState ={
  name: '4455',
  initData: {}

  // subTabList: [
  //   { name: '关注的人', value: 'default', url: '', number: 111},
  //   { name: '工作室', value: 'studio', url: '', number: 111},
  //   { name: '活动', value: 'activity', url: '', number: 111 }
  // ]
}

const changeLoginTitle = (state, action) => {
  return {
    ...state,
    name: action.name
  }
}
const changeInitData = (state, action) => {
  return {
    ...state,
    initData: action.initData
  }
}

export default (state = defaultState, action) => {
  switch(action.type) {
      case constants.CHANGE_TITLE:
        return changeLoginTitle(state, action)
      case constants.INIT_DATA:
        return changeInitData(state, action)
      default:
        return state
  }
}