import {Dropdown, Menu, Typography} from 'antd'
import {VcgIcon} from 'vcg'
import React from 'react'
import './index.less'
const { Text } = Typography

function SortDropDown ({list, name, onSortChange, trigger = ['click']}) {
  const menu = (
    <Menu onClick={({key}) => onSortChange && onSortChange({key})}>
      {
        list && list.length && list.map((sortItem, index) => (
          <Menu.Item key={sortItem.key || index}>{sortItem.name}</Menu.Item>
        ))
      }
    </Menu>
  )
  return (
    <Dropdown overlay={menu} placement='bottomLeft' trigger={trigger}>
      <Text className='sort-name'>
        {name} <VcgIcon type='xiala' size='12px' />
      </Text>
    </Dropdown>
  )
}

export default SortDropDown