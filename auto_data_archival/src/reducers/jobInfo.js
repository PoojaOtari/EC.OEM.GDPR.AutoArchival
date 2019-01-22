import { createReducer } from './../utility';
import { fromJS} from 'immutable'
import {SET_JOB} from '../actions'
export const jobInfo = createReducer(null, {
    [SET_JOB](state,{jobInfo}) {
        return fromJS(jobInfo);
    }
});