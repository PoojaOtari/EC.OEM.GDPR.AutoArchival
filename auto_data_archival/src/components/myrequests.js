import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getReq,setSAPTbl,getSAPTbl,delReq} from "../actions";
import  Footer  from './footer';
import  Header  from './header';
import  Main_component  from './main_component';
import  Menubar  from './menubar';
import {Route,Redirect,Switch} from 'react-router-dom';
import '../style/_myrequests.css';
import {reqSelector, histSelector} from '../selectors';

class Myrequests extends Component {

  
componentWillMount = () => {
    console.log("ComponentWillMount");
    this.props.GetReq();
    this.props.GetSAPTbl();
};

deploy_all= (req)=>{
  this.props.SetSAPTbl(req);                      //make these two funcs sync
  // this.props.GetSAPTbl();
}

add_more=()=>{
  window.location.href = "https://localhost:8080/home";
}

removereq=(id)=>{
  this.props.DelReq(id);
}

  render() {
    var temp;
    return (
      <div className="Myrequests">
          <Header/>
          <Menubar/>
          {/* <Main_component/> */}
          <h2>My Current Requests</h2>
          <div>
          <table id='my_requests_current'>
          <thead>
            <th>RequestID</th>
            <th>TableName</th>
            <th>Sequenceid</th>
            <th>GroupID</th>
           <th>PurgeOnly</th>
           <th>Selectjoinquery</th>
            <th>Deletequery</th>
            <th>Query Based</th>
            <th>Status </th>
            <th></th>
         
          </thead>
             <tbody>
              {this.props.req && this.props.req.map((s,index) => 
              <tr key={s.sourceTableName}>
               <td>{s.request_ID}</td>
               <td>{s.sourceTableName}</td>
               <td>{s.sequenceid}</td>
               <td>{s.groupID}</td>
               <td>{s.purgeOnly}</td>
               <td>{s.selectjoinquery}</td>
               <td>{s.deletequery}</td>
               <td>{s.queryBased}</td>
               <td>{s.result}</td>
               <td><button onClick={()=>this.removereq(s.request_ID)}>Remove</button></td>
            </tr>)}
            <tr><td><button onClick={()=>this.add_more()}> Add More</button></td>
            <td><button className='deploy' onClick={()=>this.deploy_all(this.props.req)}>Deploy All</button></td>
            </tr>

            </tbody> 
          </table>
          </div>

          <br/><br/>

          <h2>My Requests' History(SAP Purge Table)</h2>
          <div>
          <table id='my_requests_history'>
          <thead>
        
            <th>TableName</th>
            <th>Sequenceid</th>
            <th>GroupID</th>
           <th>PurgeOnly</th>
           <th>Selectjoinquery</th>
            <th>Deletequery</th>
            <th>Query Based</th>
           
          </thead>
             <tbody>
              {this.props.hist && this.props.hist.map((s,index) =>
              <tr key={s.sourceTableName}>
              <td>{s.sourceTableName}</td>
              <td>{s.sequenceid}</td>
              <td>{s.groupID}</td>
              <td>{s.purgeOnly}</td>
              <td>{s.selectjoinquery.substring(0,50) + "...."} <button>Show More</button></td>
              <td>{s.deletequery.substring(0,50) + "...."}  <button>Show More</button></td>
              <td>{s.queryBased}</td>              
            </tr>)}
            </tbody> 
          </table>
          </div>
          {/* <Footer/> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  var req = reqSelector(state);
  var hist = histSelector(state);
  req= req ? req.toJS() : req;
  hist= hist? hist.toJS() : hist;
  console.log(req);
  console.log(hist);
  if(hist){ hist = hist.reverse();}
 
  // console.log(server);
  //  console.log(database);
  console.log(hist);
  return{
  req:req,
  hist: hist
 }
}
const mapDispatchToProps = (dispatch) =>({
  GetReq:() => dispatch(getReq()),
  GetSAPTbl:() => dispatch(getSAPTbl()),
  SetSAPTbl:(req)=> dispatch(setSAPTbl(req)),
  DelReq:(id) => dispatch(delReq(id))
})

export default connect(mapStateToProps,mapDispatchToProps)(Myrequests);

