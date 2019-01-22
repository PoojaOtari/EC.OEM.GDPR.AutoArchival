import { makeActionCreator } from '../utility';
export const SET_SERVER = "SET_SERVER";
export const setServer = makeActionCreator(SET_SERVER,"serverInfo");
export const GET_SERVER = "GET_SERVER";
export const getServer = makeActionCreator(GET_SERVER);