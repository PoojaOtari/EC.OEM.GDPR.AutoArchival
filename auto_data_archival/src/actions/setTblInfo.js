import { makeActionCreator } from '../utility';
export const SET_TBL = "SET_TBL";
export const setTbl = makeActionCreator(SET_TBL,"tblInfo");
export const GET_TBL = "GET_TBL";
export const getTbl = makeActionCreator(GET_TBL,"obj");