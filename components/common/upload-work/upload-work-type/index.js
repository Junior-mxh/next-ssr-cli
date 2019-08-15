import {Modal} from 'antd'
import {VcgIcon} from 'vcg'
import './index.less'
export default (props) => {
  const {visible, onSelect, onClose } = props
  const commonModalProps = {
    className: 'reset-close-position', visible,
    destroyOnClose: true, title: null, footer: null,
    width: 458, bodyStyle: {padding: '72px 80px'},
    onCancel: () => onClose && onClose(false)
  }
  return (
    <>
      <Modal {...commonModalProps}>
        <div className='upload-type'>
          <section className='existing-works' onClick={() => onSelect && onSelect({name: 'existing', value: 0})}>
            <span className='fl upload-type-icon'>
              <VcgIcon type='yiyouzuopinshangchuan' size='30px'/>
            </span>
            <span className='fl upload-type-text'>
              <strong>选择已有作品</strong>
              <small>添加规则，如大小、格式等提示</small>
            </span>
          </section>
          <section className='new-works' onClick={() => onSelect && onSelect({name: 'new', value: 1})}>
            <span className='fl upload-type-icon'>
              <VcgIcon type='xinzuopinshangchuan' size='30px'/>
            </span>
            <span className='fl upload-type-text'>
              <strong>新作品上传</strong>
              <small>添加规则，如大小、格式等提示</small>
            </span>
          </section>
        </div>
      </Modal>
    </>
  )
}