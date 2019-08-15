import * as constants from './constants'
const upadteStateOfKey = (state, newState) => ({...state, ...newState})
const defaultState = {
  uploadWorkEntryVisible: false,
  newWorksEditComplete: true,
  textTitle: '测试标题哈哈哈ddddddd',
  selectedWorksName: [],
  worksList: [
    { name: '作业', workImg: ossBaseURL + '/common/avatar-demo.gif', id: '0', selected: false },
    { name: '作业1', workImg: ossBaseURL + '/common/avatar-demo.gif', id: '1', selected: false },
    { name: '作业2', workImg: ossBaseURL + '/common/avatar-demo.gif', id: '2', selected: false },
    { name: '作业3', workImg: ossBaseURL + '/common/avatar-demo.gif', id: '3', selected: false }
  ],
  selectedCreators: [],
  resultCreators: [],
  creators: [
    { name: 'axing 123', workImg: ossBaseURL + '/common/avatar-demo.gif', id: '0', selected: false },
    { name: 'axing 122', workImg: ossBaseURL + '/common/avatar-demo.gif', id: '1', selected: false },
    { name: 'axing 134', workImg: ossBaseURL + '/common/avatar-demo.gif', id: '2', selected: false },
    { name: 'axing 135', workImg: ossBaseURL + '/common/avatar-demo.gif', id: '3', selected: false },
    { name: 'xiao ming 123', workImg: ossBaseURL + '/common/avatar-demo.gif', id: '4', selected: false },
    { name: 'xiao ming 456', workImg: ossBaseURL + '/common/avatar-demo.gif', id: '5', selected: false },
    { name: 'zhang san 123', workImg: ossBaseURL + '/common/avatar-demo.gif', id: '6', selected: false },
    { name: 'zhang san 456', workImg: ossBaseURL + '/common/avatar-demo.gif', id: '7', selected: false },
    { name: 'li si 123', workImg: ossBaseURL + '/common/avatar-demo.gif', id: '8', selected: false },
    { name: 'lisi 456', workImg: ossBaseURL + '/common/avatar-demo.gif', id: '9', selected: false },
    { name: 'axing 136', workImg: ossBaseURL + '/common/avatar-demo.gif', id: '10', selected: false }
  ]
}


export const visibleChange = (state, action) => {
  const {key, visible} = action.payload
  return upadteStateOfKey(state, {[key]: visible})
}

const updateNewWorksEditState = (state, action) => ({...state, newWorksEditComplete: action.state})
const updateWorkTitle = (state, action) => ({...state, textTitle: action.title})
const selectWorkItem = (state, action) => {
  const index = state.worksList.findIndex(work => work.id === action.work.id)
  action.work.selected = !action.work.selected
  if (index !== -1) {
    state.worksList.splice(index, 1, action.work)
  }

  return {
    ...state,
    worksList: [...state.worksList],
    selectedWorksName: state.worksList.filter(work => work.selected).map(work => work.name).join('、')
  }
}
// 查询协同创作者
const queryCreator = (state, action) => {
  let result = state.creators.filter(creator => creator.name.startsWith(action.keyword))
  result.length && result.forEach(item => {
    item.htmlName = item.name.replace(new RegExp(`${action.keyword}`, 'g'), `<b>${action.keyword}</b>`)
  })
  return {...state, resultCreators: [...result]}
}
const selectCreator = (state, action) => {
  const index = state.resultCreators.findIndex(work => work.id === action.item.id)
  const indexOfSelect = state.selectedCreators.findIndex(work => work.id === action.item.id)
  action.item.selected = !action.item.selected
  if (index !== -1) {
    state.resultCreators.splice(index, 1, action.item)
  }
  if (indexOfSelect !== -1) {
    state.selectedCreators.splice(index, 1)
  } else {
    state.selectedCreators.push(action.item)
  }
  return {...state, resultCreators: [...state.resultCreators], selectedCreators: [...state.selectedCreators]}
}
export default (state = defaultState, action) => {
  switch(action.type) {
      case constants.VISIBLE_CHANGE:
        return visibleChange(state, action)
      case constants.UPDATE_EDIT_STATE:
        return updateNewWorksEditState(state, action)
      case constants.UPDATE_WORK_TITLE:
        return updateWorkTitle(state, action)
      case constants.SELECT_WORK_ITEM:
        return selectWorkItem(state, action)
      case constants.QUERY_CREATOR:
        return queryCreator(state, action)
      case constants.SELECT_CREATOR:
        return selectCreator(state, action)
      default:
        return state
  }
}