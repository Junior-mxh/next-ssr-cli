import { fromJS } from 'immutable'
import * as constants from './constants'

const defaultState ={
  isLogin: false,
  userInfo: {}
}

const changeLoginTitle = (state, action) => {
  return {
    ...state,
    name: action.name
  }
}

export default (state = defaultState, action) => {
  switch(action.type) {
      case constants.CHANGE_TITLE:
        return changeLoginTitle(state, action)
      default:
        return state
  }
}