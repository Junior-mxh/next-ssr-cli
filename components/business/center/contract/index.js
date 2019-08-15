import React from 'react'

export default (props) => (
  <div>
    {props.isSelf ? '自己查看' : '第三方查看'}
    签约内容
  </div>
)