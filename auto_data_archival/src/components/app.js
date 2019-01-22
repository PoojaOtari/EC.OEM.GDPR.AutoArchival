import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from './footer';
import Home from './home';
import Myrequests from './myrequests';
import Myapprovals from './myapprovals';
import Monitoring from './monitoring';
import Powerbireport from './powerbireport';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import powerbireportAll from './powerbireport.All';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/home' component={Home} />
            <Route exact path='/myrequests' component={Myrequests} />
            <Route exact path='/myapprovals' component={Myapprovals} />
            <Route exact path='/monitoring' component={Monitoring} />
            <Route exact path='/powerbireport' component={Powerbireport} />
            <Route exact path='/powerbireportAll' component={powerbireportAll} />
            <Redirect from='/*' to='/test' />
          </Switch>
          {/* <Header/>
          <Menubar/>
          <Main_component/>
          <Footer/> */}
        </div>
      </Router>

    );
  }
}
const mapStateToProps = state => ({

})
const mapDispatchToProps = dispatch => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(App);
