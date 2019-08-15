import React from 'react'
import { VcgIcon } from 'vcg'
import { Upload } from 'antd'
import './index.less'


const files = [
  {name: '测试文件.jpg', type: 'PS', status: 1},
  {name: '测试文件2.jpg', type: 'PS', status: 1},
  {name: '阿西吧.pdf', type: 'PDF', status: 1}
]


class WorkFiles extends React.Component {
  render () {
    return (
      <div className='work-files'>
        <div className="work-files-upload">
          <div className='upload-item'>
            <Upload>
              <>
                <section className='upload-text'>
                  <VcgIcon size='30px' type='tianjiatupian' />
                </section >
                <section className='upload-text'>
                  <strong>添加图片或视频</strong>
                  <small>添加规则，如大小、格式等</small>
                </section>
              </>
            </Upload>
          </div>
          <div className='upload-item'>
            <Upload>
              <>
                <section className='upload-text'>
                  <VcgIcon size='30px' type='tianjiafujian' />
                </section>
                <section className='upload-text'>
                  <strong>添加附件</strong>
                  <small>添加规则，如大小、格式等</small>
                </section>
              </>
            </Upload>
          </div>
        </div>
        <div className="work-files-list">
          {
            files.map((file, index) => (
              <section className='file-item' key={index}>
                <span className='file-type'><small>{file.type}</small></span>
                <span className='file-info'>
                  <span className='file-name'>{file.name}</span>
                  <span className='file-status'>上传完成</span>
                </span>
                <span className='delete-file'>删除</span>
              </section>
            ))
          }
        </div>
      </div>
    )
  }
}


export default WorkFiles


