import {VcgIcon} from 'vcg'

// 组件预览页面
export default () => {
  return (
    <div style={{margin: '100px auto', width: '1000px', minHeight: '400px', border: '1px solid #999'}}>
      <h2 style={{textAlign: 'center'}}>组件预览</h2>
      <br/>
      <VcgIcon type='sousuo' style={{width: '40px', height: '40px', display: 'block'}}/>
    </div>
  )
}