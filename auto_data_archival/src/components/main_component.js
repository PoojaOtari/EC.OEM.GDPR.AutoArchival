import { connect } from 'react-redux'
import React, { Component } from 'react'
import { getServer, getDatabase, getTbl,setSAPTbl,setARCHQUETbl, getgrpid,checkselectquery, checkdeletequery} from "../actions";
import background_pic from '../images/background.jpg';
import gdpr_pic from '../images/Picture1.png';
import '../style/_maincomponent.css';
import { serverSelector,databaseSelector, tblSelector, grpidSelector, QueryValidationSelector, DelQueryValidationSelector} from '../selectors';  //check for the selector for the SAp table


class Main_component extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "home",
      tags:[],
      select_query:"",
      delete_query:"",
      table_being_purged:{},
      purge_queries:[],
      ctr:0,
      search:"",
      grpid:0,
      seqid:0 ,
      select_query2:"",
      IsSelectQueryValid:"Invalid",
      IsDeleteQueryValid:"Invalid"
    };
  }
  
  loadservers(){
    this.setState({
      view: "server",
    });
  }

  loaddbs(){
    this.setState({
      view: "database",
    });
  }

  loadtbls(){
    this.setState({
        view: "table",
    });
  }


  loadpurgingdetails(){
    this.setState({
      view:"purgingtable"
    });

    this.props.Getgrpid();
  }


  loadsmry_bfr_aprvl(){
    if( document.getElementById('select_query_box').value==""){
      alert("Select Query cannot be left empty.");
    }

    else if(document.getElementById('delete_query_box').value=="" ){
      alert("Delete Query cannot be left empty.");
    }

    else if(this.state.IsSelectQueryValid=="invalid"){
      alert("Select Query is wrong.");
    }

    else if(document.getElementById('seqid_box').value=="" ){
      alert("Please fill Sequence ID");
    }


    else{
    this.setState({
      view:"summary_before"
    });
  }
  }

  runButton = (event)=>{
    this.loadservers();
    this.props.GetServer();
  }

  runButtonfordb = (server_ID)=>{
    this.loaddbs();
    // console.log(server_ID);
    this.props.GetDatabase(server_ID);
  }

  runButtonfortbl=(obj)=>{
    this.loadtbls();
    this.props.GetTbl(obj);
  }

  deploy_all= (purge_queries)=>{
    this.props.SetSAPTbl(purge_queries);
  }
    handleAddition (tag) {
      var temp=this.state.tags;
      var check=0;
        for(var i=0;i<temp.length;i++){
          if(temp[i].object_id==tag.object_id){
            check=1;
            break;
          }
        }
        if(check==0){
          temp.push(tag);
        }

      this.setState({
        tags: temp
      });
    }

    handleDeletion (i) {
      var temp=this.state.tags;
      temp.splice(i,1);
      this.setState({
        tags: temp
      });
    }

    selected_table(s){
      this.setState({
        table_being_purged: s
      });

      document.getElementById('select_query_box').value="";
      document.getElementById('delete_query_box').value="";

    }

    setgrpidandseqidinstate(s){
      console.log(s);
      var temp=s.maxseqid+1;
      this.setState({
        grpid: s.grpid,
        seqid: temp
      });

      console.log(this.state.grpid +" " +this.state.seqid);
    }

    setnewgrpid(arr){
      var max=-1;
      for(var i=0;i<arr.length;i++){
          if(arr[i].grpid > max){
            max=arr[i].grpid;
          }
      }
      this.setState({
        grpid: max+1,
        seqid: 1
      });
    }

    selected_query(str1,str2){
     this.props.Checkselectquery(str1);
      this.props.Checkdeletequery(str2);
       this.setState({
         select_query: str1,
        delete_query: str2
       });
    }



    updateSearch(event){
      this.setState({
        search: event.target.value.substr(0,20)
      });
    }

    save_query(x){
      if(this.props.selqueryvalidationres[0]!="Valid"){
          alert("Select Query is not valid");
      }

      else if(this.props.delqueryvalidationres[0]!="Valid"){
          alert("Delete Query is not valid");
      }

      else if(document.getElementById('seqid_box').value=="" ){
        alert("Please fill Sequence ID");
      }
      
      else{
      this.state.ctr=this.state.ctr + 1;
      var temp=this.state.purge_queries;
      var obj={
        SourceTableName:"[" + this.state.table_being_purged.dBname +"].[dbo].[" + this.state.table_being_purged.name + "]",
        PurgeTableName: "",
        ArchiveTableName:"[" + this.state.table_being_purged.dBname  +"_purge].[dbo].[" + this.state.table_being_purged.name + "]",
        Sequenceid:x,
        status:0,
        GroupID:this.state.grpid,
        PurgeOnly:"N",
        Selectjoinquery:"FROM " + this.state.select_query,
        Deletequery: "DELETE source1 from " + this.state.delete_query,
        QueryBased:"Y",
        Start:"2018-06-29 13:17:34.947",
        End:"2018-06-29 13:17:35.180",
        Result:"Approved"
      }
      temp.push(obj);
      this.setState({
        purge_queries: temp
      });
      console.log(obj);
      alert('Query Saved!');
    }
    }


    myfunc=(purge_queries)=>{
      console.log(purge_queries);
      this.props.SetARCHQUETbl(purge_queries);
      //window.location.href = "http://localhost:8080/myrequests";
    }

  render() {
    if(this.state.view==="home"){
      return (
        <div>
          <div id='parallax'>
           <img id='background_pic' src={background_pic}/>
           <p className='introtext'>Unlock the power of auto data archival</p>
           <button id="btn1">Register</button>
           <button id="btn2" onClick = {this.runButton}>Modify  ></button>
          </div> 
          <div id='gdrpic_container'>
            <br/><br/>
            <img id="gdprpic" src={gdpr_pic}/>
          </div>
          {/* <Footer/> */}
        </div>
        );
    }

    if(this.state.view==="server"){
      return (
        <div>
          <div id='parallax'>
           <img id='background_pic' src={background_pic}/>
           <div className='introtext'>Unlock the power of auto data archival</div>
           <button id="btn1">Register</button>
           <button id="btn2" onClick = {this.runButton}>Modify  v</button>
          </div> 
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
                <td><button id='add_button' onClick={()=>this.runButtonfordb(s.server_ID)}>Add</button></td>
              </tr>)}
            </tbody>
          </table>
          </div>
        </div>
        );
    }

    if(this.state.view==="database"){
      var obj;
    return (
      <div>
        <div id='parallax'>
         <img id='background_pic' src={background_pic}/>
         <div className='introtext'>Unlock the power of auto data archival</div>
         <button id="btn1">Register</button>
         <button id="btn2" onClick = {this.runButton}>Modify  v</button>
        </div> 
        <div>
        <table id='databases'>
        <thead>
            <th>Database Name</th>
            <th>Options</th>
          </thead>
          <tbody>
            {this.props.database && this.props.database.map((s,index) => 
            <tr key={s.database_id} >
              <td>{s.name}</td>
              <td><button id='show_button' onClick={()=>this.runButtonfortbl(obj={
                dbid:s.database_id,
                serverid:s.server_Id
              })}>Show Tables</button></td>
            </tr>)}
          </tbody>
        </table>
        </div>
        <button className='back_button' onClick={()=>this.loadservers()}>Back</button>
      </div>
      );
    }

    if(this.state.view==="table"){
      let filteredTbls;
      if(this.props.tbl){
        filteredTbls=this.props.tbl.filter(
          (x)=>{
            return x.name.toLowerCase().indexOf(this.state.search.toLowerCase())!==-1;
          }
        );  
      }
      else{
        filteredTbls=this.props.tbl;
      }
      
     return (
       <div>
         <div id='parallax'>
          <img id='background_pic' src={background_pic}/>
         <div className='introtext'>Unlock the power of auto data archival</div>
         <button id="btn1">Register</button>
          <button id="btn2" onClick = {this.runButton}>Modify  v</button>
         </div> 
         <div id="container">
           <div id="left">
         <table id='databases'>
         <thead>
            <th>Database Name</th>
            <th>Options</th>
          </thead>
           <tbody>
             {this.props.database && this.props.database.map(s => 
             <tr key={s.database_id} onClick={this.runButtonfortable}>
               <td>{s.name}</td>
               <td><button id='show_button' onClick={()=>this.runButtonfortbl(obj={
                dbid:s.database_id,
                serverid:s.server_Id
              })}>Show Tables</button></td>
             </tr>)}
             <tr> <td> </td></tr>
           </tbody>
           </table></div>
           <div id="middle">
           <table id='tables'>
              <thead>
            <th>Table Name</th>
            {/* <th><h4>{this.state.tags? 'Selected Tables are:':''}</h4></th> */}
          </thead>
      
           <tbody>
             <tr><td><input id="SearchBar" type="text" placeholder="Search Tables" value={this.state.search} onChange={this.updateSearch.bind(this)}/></td>
             {/* <td> <div>
           <br/>
          {this.state.tags && this.state.tags.map((i,index) => 
              <button class="w3-button w3-border w3-tiny" key={i.object_id} onClick={()=>this.handleDeletion(index)} > {i.name} </button>
            )}
         </div></td> */}
             </tr>
             <div className="TableList">
             {filteredTbls && filteredTbls.map(s => 
              <tr key={s.object_id}>
               <td>{s.name} <button className="AddTables" onClick={()=>this.handleAddition(s)}>+</button></td>
               </tr>)}
              </div>
           </tbody>
         </table>
         </div>
         <div id="right" className="SelectedTableList">
         <h4>{this.state.tags? 'Selected Tables are:':''}</h4>
         
          {this.state.tags && this.state.tags.map((i,index) => 
              <button class="w3-button w3-border w3-tiny" key={i.object_id} onClick={()=>this.handleDeletion(index)} > {i.name} </button>
            )}
         
         </div>
         </div>
         <button className='back_button' onClick={()=>this.loaddbs()}>Back</button>
         <button className='next_button' onClick={()=>this.loadpurgingdetails()}>Next</button>
       </div>
      );
    }

    

    if(this.state.view==="purgingtable"){
      return(
      <div>
          <div id='parallax'>
           <img id='background_pic' src={background_pic}/>
           <div className='introtext'>Unlock the power of auto data archival</div>
           <button id="btn1">Register</button>
           <button id="btn2" onClick = {this.runButton}>Modify  v</button>
          </div> 
          <div>
          <table id='purging_table'>
          <thead>
            <th>S.No.</th>
            <th>Table Name</th>
            <th>Type of purging</th>
          </thead>
            <tbody>
              {this.state.tags && this.state.tags.map((s,index) => 
              <tr key={s.object_id}>
                <td>{index + 1}</td>
                <td>{s.name}</td>
                <td><input type='radio' disabled='true' name='purgetype'/> Date 
                  &nbsp; &nbsp;
                <input type='radio' name='purgetype' onClick={()=>this.selected_table(s)}/> Query 
                </td>
              </tr>)}
            </tbody>
          </table>
          </div>
          <br></br><br></br>
          <div>
          <div className="form-text">
          <input type='text' placeholder="Enter select query here" size="90" id="select_query_box"/> &nbsp; &nbsp;
           {this.props.selqueryvalidationres} <br></br>
          <label for="select_query_box" class="static-value">SELECT * FROM </label>
         <p id='syntax'> FROM [database_name].[Schema_Name].[Table_Name> Source1 WITH(NOLOCK)  [[Joining Condition If Any ] [[Where Condition If Any]
                  </p>
          </div> 
          </div>
          <br/> 
          <div>
          <div className="form-text">
          <input type='text' placeholder="Enter delete query here" size="90" id="delete_query_box"/>
           &nbsp; &nbsp;
           {this.props.delqueryvalidationres} <br></br>
          <label for="delete_query_box" class="static-value">DELETE source1 FROM  </label>
          <p id='syntax'> DELETE source1 FROM [database_name].[Schema_Name].[Table_Name> Source1 WITH(NOLOCK)  [[Joining Condition If Any ] [[Where Condition If Any]
              </p>
          </div> 
          <button className='validate_button' onClick={()=>this.selected_query(document.getElementById('select_query_box').value , document.getElementById('delete_query_box').value)}>Validate</button>
          <br></br>
          <br></br>
          </div>
          <br/><br/>
          <div>
            
            <span style={{color: "black"}}>
             <b> Select from existing groups:</b> &nbsp; &nbsp;
              
              {this.props.grpidandseqid && this.props.grpidandseqid.map((s,index)=>
                  <button onClick={()=>this.setgrpidandseqidinstate(s)}>
                      {s.grpid} &nbsp; &nbsp;  
                  </button>
                  )}
            &nbsp;&nbsp;&nbsp;&nbsp; <button onClick={()=>this.setnewgrpid(this.props.grpidandseqid)}>+</button>
            <br></br>
            <br></br>
            <br></br>
            </span>
            <span style={{color: "black"}}>
            <b> Enter a Sequence ID:</b> &nbsp; &nbsp;
              <textarea id="seqid_box" rows="1" cols="5"></textarea><br></br>
            </span>
            <br></br><br></br>
          <p style={{color: "black"}}> <b> Selected Group ID: </b> {this.state.grpid}</p>
          </div>
          <button className='save_button' onClick={()=>this.save_query(document.getElementById('seqid_box').value)}>Save</button>
          <div>
            <button className='back_button' onClick={()=>this.loadtbls()}>Back</button>
            <button className='next_button' onClick={()=>this.loadsmry_bfr_aprvl()}>Next</button>
          </div>
        </div>
      );
    }

      if(this.state.view==="summary_before"){
        return (
          <div>
          <div>
            <div id='parallax'>
             <img id='background_pic' src={background_pic}/>
            <div className='introtext'>Unlock the power of auto data archival</div>
            <button id="btn1">Register</button>
             <button id="btn2" onClick = {this.runButton}>Modify  v</button>
            </div> 
            <div>
          <table id='summary_before_table'>
          <thead>
            {/* <th>Request ID</th> */}
            <th>Table Name</th>
            <th>Sequenceid</th>
            <th>GroupID</th>
            <th>PurgeOnly</th>
            <th>Selectjoinquery</th>
            <th>Deletequery</th>
            <th>QueryBased</th>
            
          </thead>
            <tbody>
              {this.state.purge_queries && this.state.purge_queries.map((s,index) => 
              <tr key={s.SourceTableName}>
                {/* <td>{s.Request_id}</td> */}
                <td>{s.SourceTableName}</td>
                <td>{s.Sequenceid}</td>
                <td>{s.GroupID}</td>
                <td>{s.PurgeOnly}</td>
                <td>{s.Selectjoinquery}</td>
                <td>{s.Deletequery}</td>
                <td>{s.QueryBased}</td>
              </tr>)}
            </tbody>
          </table>
          </div>
            <button className='back_button' onClick={()=>this.loadpurgingdetails()}>Back</button>
            <button className='next_button' onClick={()=>this.loadservers()}>Add More</button>
            <button className='approval_button' onClick={()=>this.myfunc(this.state.purge_queries)}>Request for Approval</button>
          </div>
          </div>
         );
       }
   }                                                              //end of render
  }                                                               // end of the component

  const mapStateToProps = (state) => {
    var server = serverSelector(state);
    var database = databaseSelector(state); 
    var tbl = tblSelector(state);
    var grpidandseqid = grpidSelector(state);
    var selqueryvalidationres = QueryValidationSelector(state);
    var delqueryvalidationres = DelQueryValidationSelector(state);
    server = server ? server.toJS() : server;
    database= database ? database.toJS() : database;
    tbl= tbl ? tbl.toJS() : tbl;
    grpidandseqid= grpidandseqid ? grpidandseqid.toJS() : grpidandseqid;
    selqueryvalidationres= selqueryvalidationres ? selqueryvalidationres.toJS() : selqueryvalidationres;
    delqueryvalidationres= delqueryvalidationres ? delqueryvalidationres.toJS() : delqueryvalidationres;
    console.log(selqueryvalidationres);
    console.log(delqueryvalidationres);
    return{
    server:server,
    database: database,
    tbl: tbl,
    grpidandseqid:grpidandseqid,
    selqueryvalidationres:selqueryvalidationres,
    delqueryvalidationres:delqueryvalidationres
   }
}

const mapDispatchToProps = (dispatch)=>({
  GetServer:() => dispatch(getServer()),
  GetDatabase:(server_ID) => dispatch(getDatabase(server_ID)),
  GetTbl:(obj) => dispatch(getTbl(obj)),
  SetSAPTbl:(purge_queries)=> dispatch(setSAPTbl(purge_queries)),
  SetARCHQUETbl:(purge_queries)=> dispatch(setARCHQUETbl(purge_queries)),
  Getgrpid: () => dispatch(getgrpid()),
  Checkselectquery:(selectquery) => dispatch(checkselectquery(selectquery)),
  Checkdeletequery:(deletequery) => dispatch(checkdeletequery(deletequery))
}) 

export default connect(mapStateToProps,mapDispatchToProps)(Main_component);
