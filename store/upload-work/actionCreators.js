import * as constants from './constants'

export const visibleChange = (key, visible) => ({type: constants.VISIBLE_CHANGE, payload: {key, visible}})
export const updateEditState = (state) => ({type: constants.UPDATE_EDIT_STATE, state})
export const updateWorkTitle = (title) => ({type: constants.UPDATE_WORK_TITLE, title})
export const selectWorkItem = (work) => ({type: constants.SELECT_WORK_ITEM, work})
export const queryCreator = (keyword) => ({type: constants.QUERY_CREATOR, keyword})
export const selectCreator = (item) => ({type: constants.SELECT_CREATOR, item})
