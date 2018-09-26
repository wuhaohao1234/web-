import React, { Component } from 'react';
import { connect } from 'react-redux'
import Moov from '../views/Moov'

const mapStateToProps = (state)=>{
  return {
    text:state.text,
    name:state.name
  }
}
const mapDispatchToPorps = (dispatch)=>{
  return {
    onChange:(e)=>dispatch({
      type:'change',
      payload:e.target.value
    })
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToPorps
)(Moov)

export default App;
