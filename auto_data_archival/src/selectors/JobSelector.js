import { createSelector } from 'reselect';

export const jobSelector = createSelector(
   state=>state.get("jobInfo"),
   jobInfo=>jobInfo
)