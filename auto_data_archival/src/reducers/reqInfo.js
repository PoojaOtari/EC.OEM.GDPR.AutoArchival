import { createReducer } from './../utility';
import { fromJS} from 'immutable'
import {SET_REQ} from '../actions'
export const reqInfo = createReducer(null, {
    [SET_REQ](state,{reqInfo}) {
        return fromJS(reqInfo);
    }
});