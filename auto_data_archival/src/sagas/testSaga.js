import { take, call, put } from 'redux-saga/effects';
import { GET_SERVER, setServer } from "../actions/setServerInfo";
import { GET_REQ, setReq, DEL_REQ} from "../actions/setReqInfo";
import { GET_DATABASE, setDatabase } from "../actions/setDatabaseInfo";
import { GET_TBL, setTbl } from "../actions/setTblInfo";
import { SET_SAPTBL , GET_SAPTBL, changeInUi, GETGRPID, setgrpid } from "../actions/setSAPTblInfo";
import { SET_ARCHQUETBL } from "../actions/setARCHQUETblInfo";
import { GET_JOB, setJob,executeJob,EXECUTE_JOB } from "../actions/setJobInfo";
import { CHECK_SELECT_QUERY, checkselectquery,setvalidationstate, CHECK_DELETE_QUERY, setvalidationstatedel } from "../actions/QueryvalidationInfo";

import fetch from "isomorphic-fetch";

export function* testSaga() {
    while (true) {
        yield take(GET_SERVER);
        var data = yield call(fetch, "https://potaripc1/Trial_New/api/Server_Info");
        data = yield data.json();
        //yield console.log(data);
        yield put(setServer(data));
    }
}

export function* testSaga2() {
    while (true) {
        const { test } = yield take(GET_DATABASE);
        var data = yield call(fetch, `https://potaripc1/Trial_New/api/Database_Info/${test}`);
        data = yield data.json();
        yield console.log(data);
        yield put(setDatabase(data));
    }
}

export function* testSaga3() {
    while (true) {
        var test = yield take(GET_TBL);

        console.log(test.obj.dbid +" " +test.obj.serverid);
        var data = yield call(fetch, `https://potaripc1/Trial_New/api/Table_Info/${test.obj.serverid}/${test.obj.dbid}`);
        data = yield data.json();
        yield console.log(data);
        yield put(setTbl(data));
    }
}


export function* testSaga4() {
    while (true) {
        var temp = yield take(SET_SAPTBL);
        yield console.log(temp.purge_queries);
        yield call(fetch,`https://potaripc1/Trial_New/api/stgSAPPurgeTableLists`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(temp.purge_queries),
        });

        yield call(fetch,`https://potaripc1/Trial_New/api/Archivalreqs`,{
            method:'DELETE',
            headers:{
               'Content-Type': 'application/json'
           },
           body:JSON.stringify(temp.purge_queries),
       });

        var data1 = yield call(fetch, "https://potaripc1/Trial_New/api/Archivalreqs");

        data1 = yield data1.json();
        //yield console.log(data);
        yield put(setReq(data1));

        var data = yield call(fetch, "https://potaripc1/Trial_New/api/SAPPurgeTables");
        data = yield data.json();
        //yield console.log(data);
        yield put(changeInUi(data));

        

        // yield console.log("Delete func done");

    }
}


export function* testSaga5() {
    while (true) {
        yield take(GET_REQ);
        var data = yield call(fetch,"https://potaripc1/Trial_New/api/Archivalreqs");
        data = yield data.json();
        //yield console.log(data);
        yield put(setReq(data));
    }
}


export function* testSaga6() {
    while (true) {
        var temp = yield take(SET_ARCHQUETBL);
        yield console.log(temp.purge_queries);
        yield call(fetch,`https://potaripc1/Trial_New/api/Archivalreqs`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(temp.purge_queries),
        });

        yield  window.location.href = "http://localhost:8080/myrequests";

    }
}

export function* testSaga7() {
    while (true) {
        yield take(GET_SAPTBL);
        var data = yield call(fetch, "https://potaripc1/Trial_New/api/SAPPurgeTables");
        data = yield data.json();
        yield console.log(data);
        yield put(changeInUi(data));
    }
}


export function* testSaga8() {
    while (true) {
        yield take(GETGRPID);
        var data = yield call(fetch,"https://potaripc1/Trial_New/api/SAPPurgeTables/5");
        data = yield data.json();
        yield console.log(data);
        yield put(setgrpid(data));
    }
}


export function* testSaga9() {
    while (true) {
        var test = yield take(GET_JOB);
        var data = yield call(fetch, `https://potaripc1/Trial_New/api/JobInfos/${test.server.server_ID}/${test.server.server_Name}`);
        data = yield data.json();
        yield console.log(data);
        yield put(setJob(data));
    }
}


export function* testSaga10() {
    while (true) {
        var test=yield take(EXECUTE_JOB);
        console.log(test);
        console.log(test.obj.serverId);
        console.log(test.obj.jobName);
       var data= yield call(fetch, `https://potaripc1/Trial_New/api/JobInfos/${test.obj.serverId}/${test.obj.jobName}/7`);
    //    yield console.log(data);
    }
}


export function* testSaga11() {
    while (true) {
        var t=yield take(CHECK_SELECT_QUERY);
        var pass= "Select * from " + t.selectquery;
        var data= yield call(fetch, `https://potaripc1/Trial_New/api/SQLqueries/${pass}`);
        yield console.log(data);
        data = yield data.json();
        yield console.log(data);
        yield put(setvalidationstate(data));
    }
}

export function* testSaga12() {
    while (true) {
        var t=yield take(CHECK_DELETE_QUERY);
        var pass= "Delete source1 from " + t.deletequery;
        console.log(pass);
        var data= yield call(fetch, `https://potaripc1/Trial_New/api/SQLqueries/${pass}`);
        yield console.log(data);
        data = yield data.json();
        yield console.log(data);
        yield put(setvalidationstatedel(data));
    }
}

export function* testSaga13() {
    while (true) {

        var test=yield take(DEL_REQ);
        console.log(test.id);

        yield call(fetch,`https://potaripc1/Trial_New/api/Archivalreqs/${test.id}`,{
            method:'DELETE',
            headers:{
               'Content-Type': 'application/json'
           }
       });

        var data = yield call(fetch,"https://potaripc1/Trial_New/api/Archivalreqs");
        data = yield data.json();
        //yield console.log(data);
        yield put(setReq(data));
    }
}