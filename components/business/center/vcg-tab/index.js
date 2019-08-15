import React, { useState } from 'react'
import classNames from 'classnames'
import './index.less'

export default (props) => {
  const { data, onChange, value = 0 } = props
  let [active, setActive] = useState(value)
  function updateActive (tab, index) {
    setActive(index)
    onChange && onChange(tab, index)
  }

  return (
    <div className='vcg-tab clearfix'>
      {
        data && data.length && data.map((tab, index) => {
          if (props.render) {
            return props.render(tab, index)
          }
          const linkItem = <a href={props.href && props.href(tab, index)} className={classNames('tab-item', {active: active === index})} key={index}>{tab.name}</a>
          const sectionItem = <section className={classNames('tab-item', {active: active === index})} key={index} onClick={() => updateActive(tab, index)}>{tab.name}</section>
          return props.link ? linkItem : sectionItem
        })
      }

    </div>
  )
}