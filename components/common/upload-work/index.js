import React from 'react'
import { connect } from 'react-redux'
import { actionCreators } from '~/store/upload-work'
import './index.less'
import dynamic from 'next/dynamic'
import {Button, Modal} from 'antd'

const UploadWorkTypeComponent = dynamic(() => import('~/components/common/upload-work/upload-work-type'), {
  loading: () => <span>loading.....</span>
})
const ExistingWorksUpload = dynamic(() => import('~/components/common/upload-work/existing-works'), {
  loading: () => <span>loading.....</span>
})
const NewWorksUpload = dynamic(() => import('~/components/common/upload-work/new-works'), {
  loading: () => <span>loading.....</span>
})


class UploadWorkComponent extends React.Component {
  constructor (props) {
    super(props)
  }

  state = {
    visible: false,
    type: 1
  }
  componentDidMount () {
    // this.setState({visible: true})
  }

  // test function
  selectType (data) {
    this.props.visibleChange('uploadWorkEntryVisible', false)
    this.setState({type: data.value, visible: true})
  }

  render () {
    const { visibleChange, uploadWorkEntryVisible, newWorksEditComplete } = this.props
    const { visible, type } = this.state
    const commonModalProps = {
      className: 'reset-close-position', visible, keyboard: false,
      destroyOnClose: true, title: null, footer: null,
      width: !newWorksEditComplete ? 1000 : 600, bodyStyle: {padding: newWorksEditComplete ? '35px 25px' : '40px 27px'},
      onCancel: () => this.setState({visible: false})
    }
    return (
      <>
        <Button type='primary' onClick={() => visibleChange('uploadWorkEntryVisible', true)}>选择作品上传方式</Button>
        <Button type='primary' onClick={() => this.setState({type: 0, visible: true})}>已有作品上传</Button>
        <Button type='primary' onClick={() => this.setState({type: 1, visible: true})}>新作品上传</Button>

        {/* 选择作品上传， 传入一个变量控制显示*/}
        <UploadWorkTypeComponent
          visible={uploadWorkEntryVisible}
          onSelect={(data) => this.selectType(data)}
          onClose={() => visibleChange('uploadWorkEntryVisible', false)} />
        <Modal  {...commonModalProps}>
          {/* 已存在作品*/}
          { type === 0 && visible && <ExistingWorksUpload /> }
          {/* 新作品 */}
          { type === 1 && visible && <NewWorksUpload /> }
        </Modal>
      </>
    )
  }

}


export default connect(state => ({
  uploadWorkEntryVisible: state.workUpload.uploadWorkEntryVisible,
  newWorksEditComplete: state.workUpload.newWorksEditComplete
}), dispatch => ({
  visibleChange (key, visible) {
    dispatch(actionCreators.visibleChange(key, visible))
  }
}))(UploadWorkComponent)