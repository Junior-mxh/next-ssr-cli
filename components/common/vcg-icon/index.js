import classNames from 'classnames'
export default (props) => {
  // 方便直接颜色,宽高, 字体大小, 样式覆盖, 可以直接传 color, width, height, size 等属性
  // 也可以style修改
  const { className, type, style = {}, color, height, width, size, onClick } = props
  const min = '20px'
  const iconProps = {
    className: classNames('iconfont', {[`icon${type}`]: true, [className]: !!className}),
    onClick: (e) =>  onClick && onClick(e),
    style: {
      color, height, width, fontSize: size,
      display: 'inline-block',
      minWidth: min,
      minHeight: min,
      textAlign: 'center',
      lineHeight: style.lineHeight || style.height,
      ...style
    }
  }
  return (
    <i {...iconProps}/>
  )
}