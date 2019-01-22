import { connect } from 'react-redux'
import React, { Component } from 'react'
import { serverSelector, databaseSelector, tblSelector } from '../selectors';
import '../style/_header.css';
import mslogo from '../images/y.png';
import userpic from '../images/user.png';

class Header extends Component {

  render() {
  
    return (
      <div id='header'>
        <div className="row">
        <div id='header1' className="col-sm-4">
          <a href='https://www.w3schools.com/html/html_images.asp'><img id='logo' src={mslogo}/></a> 
           {/* make changes in the css part */}
        </div>
       <div id='header2' className="col-sm-4">
        Auto Data Archival Cycle
       </div>
        <div  id='header3' className="col-sm-4">
        <img id='userpic' src={userpic}/>
      </div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {

}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps,mapDispatchToProps)(Header);
