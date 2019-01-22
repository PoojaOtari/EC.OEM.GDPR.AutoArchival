import { makeActionCreator } from '../utility';
export const SET_JOB = "SET_JOB";
export const setJob = makeActionCreator(SET_JOB,"jobInfo");
export const GET_JOB = "GET_JOB";
export const getJob = makeActionCreator(GET_JOB,"server");
export const EXECUTE_JOB = "EXECUTE_JOB";
export const executeJob = makeActionCreator(EXECUTE_JOB,"obj");