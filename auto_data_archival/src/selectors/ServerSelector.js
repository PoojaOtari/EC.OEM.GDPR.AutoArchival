import { createSelector } from 'reselect';

export const serverSelector = createSelector(
   state=>state.get("serverInfo"),
   serverInfo=>serverInfo
)
