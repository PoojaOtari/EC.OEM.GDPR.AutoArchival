import { makeActionCreator } from '../utility';

export const CHECK_SELECT_QUERY = "CHECK_SELECT_QUERY";
export const checkselectquery = makeActionCreator(CHECK_SELECT_QUERY,"selectquery");
export const SET_VALIDATIONSTATE = "SET_VALIDATIONSTATE";
export const setvalidationstate = makeActionCreator(SET_VALIDATIONSTATE,"result");
export const CHECK_DELETE_QUERY = "CHECK_DELETE_QUERY";
export const checkdeletequery = makeActionCreator(CHECK_DELETE_QUERY,"deletequery");
export const SET_VALIDATIONSTATEDEL = "SET_VALIDATIONSTATEDEL";
export const setvalidationstatedel = makeActionCreator(SET_VALIDATIONSTATEDEL,"resultdel");