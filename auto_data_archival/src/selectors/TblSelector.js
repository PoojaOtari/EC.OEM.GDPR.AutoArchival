import { createSelector } from 'reselect';

export const tblSelector = createSelector(
   state=>state.get("tblInfo"),
   tblInfo=>tblInfo
)
