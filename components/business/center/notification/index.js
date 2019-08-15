import React from 'react'

export default (props) => (
  <div>
    {props.isSelf ? '自己查看' : '第三方查看'}
    通知内容
  </div>
)