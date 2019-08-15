import axios from '~/utils/request'
import * as constants from './constants'
import Cookie from 'js-cookie'

const changeTitle = (name) => ({
  type: constants.CHANGE_TITLE,
  name
})

export const userLogin = () => {
  return  async (dispatch) => {
    const result = await axios({
      method: 'post',
      url: '/login',
      params: {
        name: 'mxh',
        age: 18
      }
    })
    Cookie.set('token', result.data.data.token)
    dispatch(changeTitle(result.data.data.token))
  }
}
