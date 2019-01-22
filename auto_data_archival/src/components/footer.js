import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { setUser, setDatabase, setTbl } from '../actions';
import '../style/_footer.css';


class Footer extends Component {

  render() {
    return (
      <div className='footer'>
      <pre>
        <a href=''>English(United States)</a>                                                                                                <a href=''>Privacy</a>  <a href=''>Terms of use</a>  <a href=''>Contact us</a>  C. Microsoft 2018
      </pre>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch)=>({
}) 

export default connect(mapStateToProps,mapDispatchToProps)(Footer);
