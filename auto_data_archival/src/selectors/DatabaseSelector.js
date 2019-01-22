import { createSelector } from 'reselect';

export const databaseSelector = createSelector(
   state=>state.get("databaseInfo"),
   databaseInfo=>databaseInfo
)
