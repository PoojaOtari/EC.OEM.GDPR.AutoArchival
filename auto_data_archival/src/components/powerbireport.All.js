import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getServer} from "../actions";
import  Footer  from './footer';
import  Header  from './header';
import  Menubar  from './menubar';
import { serverSelector} from '../selectors';
import '../style/_powerbireportAll.css';
class PowerbireportAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "home"
    };
  }
  render() {
    return(     
        <div className='PowerbiReportAll'>
            <Header/>
            <Menubar/>
          <iframe width="1050" height="580" src="https://msit.powerbi.com/view?r=eyJrIjoiODAzMDUwOTItZTBiZC00NTE1LTkyNWUtMzIyMGVhMjUxMWJiIiwidCI6IjcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0NyIsImMiOjV9" frameborder="0" allowFullScreen="true"></iframe>
          <br></br>    
          </div>
        );
    }
}

const mapStateToProps = (state) => {
  var server = serverSelector(state);
  server = server ? server.toJS() : server;
  
  return{
  server:server
 }
}

const mapDispatchToProps = (dispatch)=>({
  GetServer:() => dispatch(getServer())
}) 
export default connect(mapStateToProps,mapDispatchToProps)(PowerbireportAll);
