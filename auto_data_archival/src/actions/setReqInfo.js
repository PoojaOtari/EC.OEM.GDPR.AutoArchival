import { makeActionCreator } from '../utility';
export const SET_REQ = "SET_REQ";
export const setReq = makeActionCreator(SET_REQ,"reqInfo");
export const GET_REQ = "GET_REQ";
export const getReq = makeActionCreator(GET_REQ);
export const DEL_REQ = "DEL_REQ";
export const delReq = makeActionCreator(DEL_REQ,"id");