import { createReducer } from './../utility';
import { fromJS} from 'immutable'
import {SET_TBL} from '../actions'
export const tblInfo = createReducer(null, {
    [SET_TBL](state,{tblInfo}) {
        return fromJS(tblInfo);
    }
});