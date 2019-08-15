import  classnames from 'classnames'
import './index.less'
// 0 已关注 1 互相关注  2未关注
const statusMap = {
  0: '已关注',
  1: '互相关注',
  2: '关注',
  [-1]: '撤回'
}
export default ({status = 0, onClick})=>{

  return (
    <div className={classnames({
      'follow-btn': true,
      'followed': status===0 || status===1 || status === -1,
      'unfollowed': status===2
    })}
    onClick={onClick?()=>onClick():null}
    >{statusMap[status]}</div>
  )
}