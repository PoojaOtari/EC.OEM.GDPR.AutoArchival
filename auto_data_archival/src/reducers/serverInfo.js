import { createReducer } from './../utility';
import { fromJS} from 'immutable'
import {SET_SERVER} from '../actions'
export const serverInfo = createReducer(null, {
    [SET_SERVER](state,{serverInfo}) {
        return fromJS(serverInfo);
    }
});