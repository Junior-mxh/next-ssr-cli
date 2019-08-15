import React from 'react'
import {connect} from 'react-redux'


class ExistingWorksUpload extends React.Component {
  render () {
    return (
      <div>ExistingWorksUpload</div>
    )
  }
}

const mapState = state => ({
  ...state.workUpload
})
const mapDispatch = dispatch => ({
  dispatch
})
export default connect(mapState, mapDispatch)(ExistingWorksUpload)