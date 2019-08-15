import { fromJS } from 'immutable'
import * as constants from './constants'
const testData = new Array(9).fill('').map((o, i) => ({name: 'xiao ming', date: '刚刚'}))
const defaultState ={
  visitorList: testData,
  works: {
    dataList: testData
  },
  worksList: {
    dataList: testData
  },
  recycleBin: {
    dataList: testData,
    selectedList: [],
    selectAll: false
  },
  collect: {
    dataList: testData,
    currentCollect: null
  },
  giveALike: {
    dataList: testData
  },
  activity: {
    dataList: [
      {
        name: '',
        status: 1
      },
      {
        name: '',
        value: 1
      },
      {
        name: '',
        value: 1
      }
    ]
  }
}
// 根据key更新子模块的数据
const upadteStateOfKey = (state, key, payload) => ({...state, [key]: {...state[key], ...payload}})
const changeInitData = (state, action) => {
  return {
    ...state,
    ...action.initData
  }
}

// 回收站选择item
const handleSelectItem = (state, action) => {
  const { index } = action.item
  const i = state.recycleBin.selectedList.indexOf(index)
  let newList = []
  if (i !== -1) {
    state.recycleBin.selectedList.splice(i, 1)
    newList = state.recycleBin.selectedList
  } else {
    newList = [...state.recycleBin.selectedList, index]
  }
  return upadteStateOfKey(state, 'recycleBin', {
    selectedList: newList,
    selectAll: newList.length === state.recycleBin.dataList.length
  })
}
// 回收站清空选中
const clearSelectedRecycleBin = (state) => upadteStateOfKey(state, 'recycleBin', {
  dataList: state.recycleBin.dataList.filter((item, index) => state.recycleBin.selectedList.indexOf(index) === -1),
  selectedList: [],
  selectAll: false
})
// 回收站全选
const selectAllChange = (state, {checked}) => upadteStateOfKey(state, 'recycleBin', {
  selectAll: checked,
  selectedList: checked ? state.recycleBin.dataList.map((o, i) => i) : []
})
// 查看当前收藏夹
const viewCurrentCollect = (state, action) => upadteStateOfKey(state, 'collect', {currentCollect: action.current})














export default (state = defaultState, action) => {
  switch(action.type) {
      case constants.INIT_DATA:
        return changeInitData(state, action)
      case constants.SELECT_ITEM:
        return handleSelectItem(state, action)
      case constants.CLEAR_RECYCLE_BIN_SELECTED:
        return clearSelectedRecycleBin(state)
      case constants.VIEW_CURRENT_COLLECT:
        return viewCurrentCollect(state, action)
      case constants.SELECT_ALL_CHANGE:
        return selectAllChange(state, action)
      default:
        return state
  }
}