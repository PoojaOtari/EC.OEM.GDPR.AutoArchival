import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getServer, getDatabase, getTbl } from "../actions";
import Footer  from './footer';
import  Header  from './header';
import  Main_component  from './main_component';
import  Menubar  from './menubar';
import {Route,Redirect,Switch} from 'react-router-dom';

class Home extends Component {

  render() {
    return (
      <div className="Home">
          <Header/>
          <Menubar/>
          <Main_component/>
          {/* <Footer/> */}
      </div>
    );
  }
}
const mapStateToProps = state=>({
  
})
const mapDispatchToProps = dispatch =>({
 
})
export default connect(mapStateToProps,mapDispatchToProps)(Home);
