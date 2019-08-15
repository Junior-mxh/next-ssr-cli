import { combineReducers } from 'redux'
import { reducer as loginReducer } from '~/pages/login/store'
import { reducer as centerReducer } from '~/pages/center/store'
import { reducer as informationReducer} from '~/pages/information/store'
import { reducer as globalReducer } from './global'
import { reducer as uploadWorkReducer } from './upload-work'

const reducer = combineReducers({
  workUpload: uploadWorkReducer,
  login: loginReducer,
  center: centerReducer,
  global: globalReducer,
  information: informationReducer
})

export default reducer
