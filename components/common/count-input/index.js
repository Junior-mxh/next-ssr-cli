import React, {useState} from 'react'
import { PATTERNS } from '~/utils/constant'
import './index.less'
export default function CountInput (props) {
  let [count, updateCount] = useState(props.defaultCount)

  function updateInnerCount (e) {
    let newCount = e.target.value
    if (newCount === '') {
      updateCount(props.defaultCount)
      props.onChange && props.onChange(props.defaultCount)
      return false
    }
    const isNumberValue = PATTERNS.isNumber.test(newCount)
    if (isNumberValue) {
      updateCount(+newCount)
      props.onChange && props.onChange(+newCount)
    }
  }
  const addCount = (count) => {
    updateCount(count)
    props.onChange && props.onChange(count)
  }
  const minusCount = (count) => {
    if (count < 1) {
      updateCount(0)
      props.onChange && props.onChange(0)
      return false
    }
    updateCount(count)
    props.onChange && props.onChange(count)
  }
  return (
    <section className='count-input'>
      <button className='add-btn' onClick={() => minusCount(--count)}>-</button>
      <span className='value'>
        <input type="text" value={`${count}`} onChange={updateInnerCount} onBlur={updateInnerCount}/>
      </span>
      <button className='minus-btn' onClick={() => addCount(++count)}>+</button>
    </section>
  )
}