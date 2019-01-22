import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getServer, getJob, executeJob} from "../actions";
import  Footer  from './footer';
import  Header  from './header';
import  Main_component  from './main_component';
import  Menubar  from './menubar';
import {Route,Redirect,Switch} from 'react-router-dom';
import '../style/_monitoring.css';
import '../style/_maincomponent.css';
import { serverSelector,jobSelector} from '../selectors';  //check for the selector for the SAp table

class Monitoring extends Component {


  constructor(props) {
    super(props);
    this.state = {
    view: "server",
    };
  }

  componentWillMount = () => {
    console.log("ComponentWillMount");
    this.props.GetServer();
};

getjobsforthisserver = (server) =>{
  this.setState({
    view: "jobs",
  });
  this.props.GetJob(server);
}

  execute = (obj)=>{
    this.props.ExecuteJob(obj);
    alert("Executing " + obj.jobName);
  }

  render() {

    if(this.state.view==="server"){
      return ( 
        <div className="Monitoring">
        <Header/>
        <Menubar/>
          <div>
          <table id='servers'>
          <thead>
            <th>Server ID</th>
            <th>Datasource Name</th>
            <th>Server Name</th>
            <th>Options</th>
          </thead>
            <tbody>
              {this.props.server && this.props.server.map(s => 
              <tr key={s.server_ID}>
                <td>{s.server_ID}</td>
                <td>{s.dataSource_Name}</td>
                <td>{s.server_Name}</td>
                <td><button id='add_button' onClick={()=>this.getjobsforthisserver(s)}>Show Jobs</button></td>
              </tr>)}
            </tbody>
          </table>
          </div>
                </div>
        );
    }

    if(this.state.view==="jobs"){
      var obj;
      return (
        <div>
            <Header/>
            <Menubar/>
            <h2>Current Available Jobs</h2>
            <br></br><br></br>
            <div>
            <table id='available_group_jobs'>
            <thead>
              <th>Server Name</th>			
              <th>Job ID</th>
              <th>Job Name</th>
              <th>Run Status</th>
              <th>Next Scheduled Run</th>
              <th>Message</th>
              <th>Emailed To</th>
              <th>Run Date</th>
              <th>Run Time</th>
              <th>Time Taken</th>
              <th>Started Date</th>
              <th>Stop Execution Date</th>
              <th></th>
            </thead>
               <tbody>
                {this.props.jobs && this.props.jobs.map((s,index) => 
                <tr key={index}>
                <td>{s.serverName}</td>
                <td>{s.jobId}</td>
                <td>{s.jobName}</td>
                <td>{s.runStatus}</td>
                <td>{s.nextScheduledRun}</td>
                <td>{s.message}</td>
                <td>{s.emailedTo}</td>
                <td>{s.runDate}</td>
                <td>{s.runTime}</td>
                <td>{s.timeTaken}</td>
                <td>{s.startedDate}</td>
                <td>{s.stopExecutionDate}</td>
                <td><button onClick={()=>this.execute(obj={
                  serverId: s.serverId,
                  jobName: s.jobName
                })}>Execute</button></td>
              </tr>)}
              </tbody>
            </table>
            </div>
            {/* <Footer/> */}
        </div>
      );
    }
  }
}


const mapStateToProps = (state) => {
  var jobs = jobSelector(state);
  jobs= jobs ? jobs.toJS() : jobs;
  var server = serverSelector(state);
  server = server ? server.toJS() : server;
  console.log(jobs);
  // console.log(server);
  //  console.log(database);
  return{
  server:server,
  jobs:jobs
 }
}


const mapDispatchToProps = (dispatch) =>({
  GetServer:() => dispatch(getServer()),
  GetJob:(server) => dispatch(getJob(server)),
  ExecuteJob:(obj) => dispatch(executeJob(obj))
})


export default connect(mapStateToProps,mapDispatchToProps)(Monitoring);
