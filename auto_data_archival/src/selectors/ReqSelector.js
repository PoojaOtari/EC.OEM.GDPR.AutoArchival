import { createSelector } from 'reselect';

export const reqSelector = createSelector(
   state=>state.get("reqInfo"),
   reqInfo=>reqInfo
)