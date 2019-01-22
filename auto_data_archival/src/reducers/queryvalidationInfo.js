import { createReducer } from './../utility';
import { fromJS} from 'immutable'
import {SET_VALIDATIONSTATE,SET_VALIDATIONSTATEDEL} from '../actions'

export const result = createReducer(null, {
    [SET_VALIDATIONSTATE](state,{result}) {
        return fromJS(result);
    }
});

export const resultdel = createReducer(null, {
    [SET_VALIDATIONSTATEDEL](state,{resultdel}) {
        return fromJS(resultdel);
    }
});