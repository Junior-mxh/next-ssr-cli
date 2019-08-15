import { useState } from 'react'
import { Typography } from 'antd'
import './index.less'
const { Paragraph } = Typography
export default (props) => {
  const { isSelf = false, userInfo = {}, onInfoChange } = props
  const {
    name = '小明', area = '江苏.苏州',
    sign = '编辑签名档', occupation = '前端灵魂画手'
  } = userInfo
  let [str, setStr] = useState(sign)
  const handleStrChange = (newSign) => {
    setStr(newSign)
    onInfoChange && onInfoChange({...userInfo, sign: newSign})
  }
  return (
    <div className="user-info-card">
      <div className="user-avatar">
        <img src={ossBaseURL + '/common/avatar-demo.gif'} alt="用户头像"/>
      </div>
      <strong className='name block'>{name}</strong>
      <div className='sign block'>
        {
          isSelf ? <Paragraph title={'编辑签名'} style={{left: 0, width: '80%', margin: '0 auto'}} editable={{ onChange: handleStrChange }}>{str}</Paragraph> : sign
        }
      </div>
      {
        !isSelf && (
          <>
            <span className='area block'>{area}</span>
            <span className='occupation block'>{occupation}</span>
            <span className='inner-painter block'>视觉中国签约画师</span>
          </>
        )
      }

    </div>
  )
}