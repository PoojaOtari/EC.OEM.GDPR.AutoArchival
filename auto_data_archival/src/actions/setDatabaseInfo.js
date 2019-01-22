import { makeActionCreator } from '../utility';
export const SET_DATABASE = "SET_DATABASE";
export const setDatabase = makeActionCreator(SET_DATABASE,"databaseInfo");
export const GET_DATABASE = "GET_DATABASE";
export const getDatabase = makeActionCreator(GET_DATABASE,"test");