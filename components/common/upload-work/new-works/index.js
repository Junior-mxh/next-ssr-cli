import React, {useState} from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import './index.less'
import dynamic from 'next/dynamic'
import { actionCreators } from '~/store/upload-work'
const leadValue = '么得感情的文案，Summary，写个两三行。简介页面，所有介绍都可以写在这里，下面全部堆图。就可以了。就可以了。就可以了。就可以了。就可以了。'
const WorksClassification = dynamic(() => import('~/components/common/upload-work/works-classification'), {
  loading: () => <span>loading.....</span>
})
const WorkFiles = dynamic(() => import('~/components/common/upload-work/work-files'), {
  loading: () => <span>loading.....</span>
})
const NewWorkSetting = dynamic(() => import('~/components/common/upload-work/new-work-setting'), {
  loading: () => <span>loading.....</span>
})






class NewWorksUpload extends React.Component {
  constructor (props) {
    super(props)
  }
  state = {
    editorState: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>') // 设置编辑器初始内容
  }
  handleChange = (editorState) => {
    console.log(editorState)
  }
  render () {
    const { newWorksEditComplete, updateEditState, textTitle } = this.props
    const controls = [
      'undo', 'redo', 'separator', 'bold', 'italic', 'underline',
      'strike-through', 'separator', { key: 'headings', title: '正文', text: '' },
      'list-ul', 'media'
    ]
    const editorProps = {
      contentStyle: {height: '450px'},
      placeholder: '请输入正文', controls,
      onChange: this.handleChange
    }

    // 已经编辑完毕，准备设置工作
    if (newWorksEditComplete) {
      return <NewWorkSetting />
    }
    return (
      <div className='new-work-editor clearfix'>
        <div className="work-editor-left">
          <div className='work-name'>
            <input placeholder='作品标题不超过30字' value={textTitle} onChange={this.props.handleTitleChange}/>
          </div>
          <div className='work-lead'>
            <textarea placeholder='导语' defaultValue={leadValue}/>
          </div>
          <div className="work-detail-editor">
            <BraftEditor {...editorProps}/>
          </div>
          <div className="work-operation-buttons">
            <Button type="link" style={{color: '@theme-color'}} onClick={() => window.open('/detail/3123')}>预览</Button>
            <Button type='primary' shape='round'
              style={{width: '130px', marginLeft: '30px'}}
              onClick={() => updateEditState(true)}>
              下一步</Button>
          </div>
        </div>
        <div className="work-editor-right">
          <WorksClassification />
          <div className="work-tags">作品标签</div>
          <WorkFiles />
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  ...state.workUpload
})
const mapDispatch = dispatch => ({
  updateEditState (state) {
    dispatch(actionCreators.updateEditState(state))
  },
  handleTitleChange (e) {
    dispatch(actionCreators.updateWorkTitle(e.target.value))
  }
})
export default connect(mapState, mapDispatch)(NewWorksUpload)