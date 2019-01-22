import { createReducer } from './../utility';
import { fromJS} from 'immutable'
import {SET_DATABASE} from '../actions'
export const databaseInfo = createReducer(null, {
    [SET_DATABASE](state,{databaseInfo}) {
        return fromJS(databaseInfo);
    }
});