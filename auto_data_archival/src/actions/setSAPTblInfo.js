import { makeActionCreator } from '../utility';
export const SET_SAPTBL = "SET_SAPTBL";
export const setSAPTbl = makeActionCreator(SET_SAPTBL,"purge_queries");
export const GET_SAPTBL = "GET_SAPTBL";
export const getSAPTbl = makeActionCreator(GET_SAPTBL);
export const CHANGEINUI = "CHANGEINUI";
export const changeInUi = makeActionCreator(CHANGEINUI,"sap_info");
export const GETGRPID = "GETGRPID";
export const getgrpid = makeActionCreator(GETGRPID);
export const SETGRPID = "SETGRPID";
export const setgrpid = makeActionCreator(SETGRPID,"grpidInfo");