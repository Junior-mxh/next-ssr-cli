import React from 'react'
import './index.less'
import classNames from 'classnames'
import { Button } from 'antd'
class Pagination extends React.Component {
  constructor (props) {
    super(props)
    // this.state = {
    //   isLoading: false,
    //   currentPage: 1
    // }
  }
  getMore = () => {
    let currentPage = this.props.currentPage
    this.props.onChange(currentPage+1)
  }
  render () {
    const {
      currentPage,
      onChange,
      isLoading
    } = this.props
    return (
      <>
        <Button
          onClick={this.getMore}
          loading={isLoading}
          className='custom-class'>
          {isLoading?'Loading':'加载更多'}
        </Button>
      </>
    )
  }
}
Pagination.defaultProps={
  currentPage: 1
}
export default Pagination