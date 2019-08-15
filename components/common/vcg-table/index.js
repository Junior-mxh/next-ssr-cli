import classNames from 'classnames'
import React from 'react'
import './index.less'

export default function VcgTable ({columns = [], data = [], stripe = false, border = true}) {
  return (
    <div className={classNames('vcg-table', {stripe, border})}>
      <section className='vcg-table-header'>
        {
          columns && columns.length > 0 && columns.map((column, index) => {
            const columnStyle = {
              textAlign: column.align || 'center',
              width: `calc(100% / ${columns.length})`
            }
            if (column.titleRender) {
              return (
                <span
                  style={columnStyle}
                  className='vcg-table-column'
                  key={column.key || index}>{column.titleRender(column, index)}</span>
              )
            }
            return (
              <span style={columnStyle} className='vcg-table-column' key={column.key || index}>{column.title}</span>
            )
          })
        }
      </section>
      <div className='vcg-table-body'>
        {
          data && data.length > 0 && data.map((row, index) => {
            return (
              <section className='vcg-table-row clearfix' key={index}>
                {
                  columns.map((column, index) => {
                    const {key, align, render} = column
                    return (
                      <span key={key}
                        style={{textAlign: align || 'center', width: `calc(100% / ${columns.length})`}}
                        className='vcg-table-row-column'>
                        {render ? render(row, column, index) : row[key]}
                      </span>
                    )
                  })
                }
              </section>
            )
          })
        }
        {
          data && data.length <= 0 && <p className='none-data'>暂无数据</p>
        }
      </div>
    </div>
  )
}