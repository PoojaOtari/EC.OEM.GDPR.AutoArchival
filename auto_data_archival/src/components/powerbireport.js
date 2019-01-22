import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getServer} from "../actions";
import  Footer  from './footer';
import  Header  from './header';
import  Menubar  from './menubar';
import { serverSelector} from '../selectors';
import '../style/_powerbireport.css';



class Powerbireport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      view: "home"
    };
  }

  componentWillMount = () => {
    console.log("ComponentWillMount");
    this.props.GetServer();
};


ChangeViewToShowReport(id){
  if(id==1){
    this.setState({
      view:"PRS"
    });
  }
  else if(id==2){
    this.setState({
      view:"WHS"
    });
  }
  else if(id==3){
    this.setState({
      view:"UI"
    });
  }
  else if(id==4){
    this.setState({
      view:"COR1"
    });
  }
  else if(id==5){
    this.setState({
      view:"COR2"
    });
  }
  else if(id==6){
    this.setState({
      view:"RPT"
    });
  }
}


  render() {
    if(this.state.view==="home"){
      return (
        <div>
            <Header/>
            <Menubar/>
            <br></br>
            <h3>Reports</h3>
           <div>
             <div id="leftsec">
             <table id='serversreport'>
             <thead>
            <th>Server ID</th>
            <th>Datasource Name</th>
            </thead>
            <tbody>
              {this.props.server && this.props.server.map(s => 
              <tr key={s.server_ID}  onClick={()=>this.ChangeViewToShowReport(s.server_ID)}>
                <td>{s.server_ID}</td>
                <td>{s.dataSource_Name}</td>
              </tr>)}
            </tbody>
          </table>
             </div>
             <div className='vl'></div>
             <div id="rightsec"><div id="DefaultText">Please select a server to show reports</div></div>
           </div>
        </div>
      );
    }
    if(this.state.view==="PRS"){
      return (
        <div className='PowerbiReport'>
            <Header/>
            <Menubar/>
            <br></br>
            <h3>Reports</h3>
          <div id='leftsec'>
          <table id='serversreport'>
               <thead>
              <th>Server ID</th>
              <th>Datasource Name</th>
              </thead>
              <tbody>
                {this.props.server && this.props.server.map(s => 
                <tr key={s.server_ID} onClick={()=>this.ChangeViewToShowReport(s.server_ID)}>
                  <td>{s.server_ID}</td>
                  <td>{s.dataSource_Name}</td>
                </tr>)}
              </tbody>
            </table>
          </div>
          <div className='vl'></div>
          <div id='rightsec'><h4>Report for <b>PRS</b> GDPR</h4><br></br><iframe width="850" height="670" src="https://msit.powerbi.com/view?r=eyJrIjoiYzJiYWI1MmYtMDg4NS00ZDgzLTllMjgtYWE5NmZlZjBjNDRkIiwidCI6IjcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0NyIsImMiOjV9" frameborder="0" allowFullScreen="true"></iframe>
          </div>
          </div>
      );
    }

    if(this.state.view==="WHS"){
      return (
        <div className='PowerbiReport'>
            <Header/>
            <Menubar/>
            <br></br>
            <h3>Reports</h3>
          <div id='leftsec'>
          <table id='serversreport'>
               <thead>
              <th>Server ID</th>
              <th>Datasource Name</th>
              </thead>
              <tbody>
                {this.props.server && this.props.server.map(s => 
                <tr key={s.server_ID} onClick={()=>this.ChangeViewToShowReport(s.server_ID)}>
                  <td>{s.server_ID}</td>
                  <td>{s.dataSource_Name}</td>
                </tr>)}
              </tbody>
            </table>
          </div>
          <div className='vl'></div>
          <div id='rightsec'><h4>Report for <b>WHS</b> GDPR</h4><br></br><iframe width="850" height="670" src="https://msit.powerbi.com/view?r=eyJrIjoiMDJkZGVlN2EtODViYS00NDJhLTliOWQtMjViMWI0NmJkODFjIiwidCI6IjcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0NyIsImMiOjV9" frameborder="0" allowFullScreen="true"></iframe>
          </div>
          </div>
      );
    }
    if(this.state.view==="UI"){
      return (
        <div className='PowerbiReport'>
            <Header/>
            <Menubar/>
            <br></br>
            <h3>Reports</h3>
          <div id='leftsec'>
          <table id='serversreport'>
               <thead>
              <th>Server ID</th>
              <th>Datasource Name</th>
              </thead>
              <tbody>
                {this.props.server && this.props.server.map(s => 
                <tr key={s.server_ID} onClick={()=>this.ChangeViewToShowReport(s.server_ID)}>
                  <td>{s.server_ID}</td>
                  <td>{s.dataSource_Name}</td>
                </tr>)}
              </tbody>
            </table>
          </div>
          <div className='vl'></div>
          <div id='rightsec'><h4>Report for <b>UI</b> GDPR</h4><br></br><iframe width="850" height="670" src="https://msit.powerbi.com/view?r=eyJrIjoiMTc5NWUxOTQtNzQ4Yy00OGQ0LWE0ZGUtMTA3N2FiYWQ5OTg2IiwidCI6IjcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0NyIsImMiOjV9" frameborder="0" allowFullScreen="true"></iframe>
          </div>
          </div>
      );
    }
    if(this.state.view==="COR1"){
      return (
        <div className='PowerbiReport'>
            <Header/>
            <Menubar/>
            <br></br>
            <h3>Reports</h3>
          <div id='leftsec'>
          <table id='serversreport'>
               <thead>
              <th>Server ID</th>
              <th>Datasource Name</th>
              </thead>
              <tbody>
                {this.props.server && this.props.server.map(s => 
                <tr key={s.server_ID} onClick={()=>this.ChangeViewToShowReport(s.server_ID)}>
                  <td>{s.server_ID}</td>
                  <td>{s.dataSource_Name}</td>
                </tr>)}
              </tbody>
            </table>
          </div>
          <div className='vl'></div>
          <div id='rightsec'><h4>Report for <b>COR1</b> GDPR</h4><br></br><iframe width="850" height="670" src="https://msit.powerbi.com/view?r=eyJrIjoiYjNkMDkzYTItZThkOC00ZjEwLTk1OTQtNjkxMzI0NWFlMTExIiwidCI6IjcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0NyIsImMiOjV9" frameborder="0" allowFullScreen="true"></iframe>
          </div>
          </div>
      );
    }
    if(this.state.view==="COR2"){
      return (
        <div className='PowerbiReport'>
            <Header/>
            <Menubar/>
            <br></br>
            <h3>Reports</h3>
          <div id='leftsec'>
          <table id='serversreport'>
               <thead>
              <th>Server ID</th>
              <th>Datasource Name</th>
              </thead>
              <tbody>
                {this.props.server && this.props.server.map(s => 
                <tr key={s.server_ID} onClick={()=>this.ChangeViewToShowReport(s.server_ID)}>
                  <td>{s.server_ID}</td>
                  <td>{s.dataSource_Name}</td>
                </tr>)}
              </tbody>
            </table>
          </div>
          <div className='vl'></div>                                                                     
          <div id='rightsec'><h4>Report for<b> COR2</b> GDPR</h4><br></br><iframe width="850" height="670" src="https://msit.powerbi.com/view?r=eyJrIjoiMDIxYWVkNTctZTNhMS00OGNkLWFmODMtMTY5YmQ3ZGU5MWJhIiwidCI6IjcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0NyIsImMiOjV9" frameborder="0" allowFullScreen="true"></iframe>
          </div>
          </div>
      );
    }

if(this.state.view==="RPT"){
    return (
      <div className='PowerbiReport'>
          <Header/>
          <Menubar/>
          <br></br>
          <h3>Reports</h3>
        <div id='leftsec'>
        <table id='serversreport'>
             <thead>
            <th>Server ID</th>
            <th>Datasource Name</th>
            </thead>
            <tbody>
              {this.props.server && this.props.server.map(s => 
              <tr key={s.server_ID} onClick={()=>this.ChangeViewToShowReport(s.server_ID)}>
                <td>{s.server_ID}</td>
                <td>{s.dataSource_Name}</td>
              </tr>)}
            </tbody>
          </table>
        </div>
        <div className='vl'></div>
        <div id='rightsec'><h4>Report for <b>RPT</b> GDPR</h4><br></br><iframe width="850" height="670" src="https://msit.powerbi.com/view?r=eyJrIjoiOTQ4ZmNhNmEtMzk3Mi00N2Y0LWExYTMtOTE0M2IyMzQ1NTZjIiwidCI6IjcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0NyIsImMiOjV9" frameborder="0" allowFullScreen="true"></iframe>
        </div>
        </div>
    );
  }
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
export default connect(mapStateToProps,mapDispatchToProps)(Powerbireport);
