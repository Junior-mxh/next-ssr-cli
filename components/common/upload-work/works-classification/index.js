import {Dropdown, Menu} from 'antd'
import React, {useState} from 'react'
import { VcgIcon } from 'vcg'
import classNames from 'classnames'
import './index.less'

const dropdownList = Array.apply(null, {length: 10}).fill({
  label: '平面',
  list: [
    { label: 'logo', value: '0' },
    { label: 'vi/ci', value: '1' },
    { label: '信息图', value: '2' },
    { label: '海报', value: '3' },
    { label: '包装', value: '4' },
    { label: '广告', value: '5' },
    { label: '广告1', value: '6' },
    { label: '广告2', value: '7' },
    { label: '广告3', value: '8' },
    { label: '广告4', value: '9' },
    { label: '画册', value: '10' }
  ]
}).map((o, index) => ({...o, index, label: `${o.label}_${index}`}))

export default ({activeValue = 0, onChange}) => {
  let [visible, setVisible] = useState(false)
  let [active, setActive] = useState(activeValue)
  let [subActive, setSubActive] = useState(null)
  function selectItem (item, subItem, subIndex) {
    setSubActive(subIndex)
    setVisible(false)
    onChange && onChange(item, {...subItem, index: subIndex})
  }
  const MenuBox = (
    <Menu>
      <Menu.Item>
        <div className='selected-dropdown'>
          <div className='subList'>
            {
              dropdownList.map(item => (
                <section
                  onMouseEnter={() => setActive(item.index)}
                  className={classNames({active: active === item.index})}
                  key={item.index}>
                  {item.label}
                </section>)
              )
            }
          </div>
          <div className='lastList'>
            {
              dropdownList[active].list.map((item, index) => (
                <section
                  onClick={() => selectItem(dropdownList[active], item, index)}
                  className={classNames({active: subActive === index})}
                  key={item.value}>
                  {dropdownList[active].label}{item.label}
                </section>)
              )
            }
          </div>
        </div>

      </Menu.Item>
    </Menu>
  )
  return (
    <div className="classification">
      <Dropdown
        // visible={visible}
        getPopupContainer={() => document.querySelector('.classification-name')}
        overlay={MenuBox}
        overlayClassName='classification-dropdown'
        trigger={['click']}>
        <span className="classification-name" onClick={() => setVisible(true)}>
          作品类别 <VcgIcon type='xiala' size='12px' />
        </span>
      </Dropdown>
    </div>
  )
}