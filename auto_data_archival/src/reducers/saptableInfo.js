import { createReducer } from './../utility';
import { fromJS} from 'immutable'
import {CHANGEINUI, SETGRPID} from '../actions'

export const sap_info = createReducer(null, {
    [CHANGEINUI](state,{sap_info}) {
        return fromJS(sap_info);
    }
});


export const grpidInfo = createReducer(null, {
    [SETGRPID](state,{grpidInfo}) {
        console.log(grpidInfo);
        return fromJS(grpidInfo);
    }
});