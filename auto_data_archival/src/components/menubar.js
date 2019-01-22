import { connect } from 'react-redux'
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import '../style/_menubar.css';
import { App } from './app';
import { Myrequests } from './myrequests';
import { Myapprovals } from './myapprovals';
import { Monitoring } from './monitoring';
import {powerbireportAll} from './powerbireport.All';

class Menubar extends Component {

  render() {
    return (
      
      <div id='menu_bar'>
        <ul>
          {/* <li><a href='/home'>Home</a></li> */}
          <li><Link to="/home">Home</Link></li>

          <li><Link to="/myrequests">My Requests</Link></li>
          <li><Link to="/myapprovals">My Approvals</Link></li>
          <li><Link to="/monitoring">Deploy Jobs</Link></li>
          <li> <Link to="/powerbireport">Reports and Monitoring</Link></li>
          <li> <Link to="/powerbireportAll">Reports and Monitoring All</Link></li>

        </ul>
      </div>
      
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps,mapDispatchToProps)(Menubar);
