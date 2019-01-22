import { createSelector } from 'reselect';


export const histSelector = createSelector(
   state=>state.get("sap_info"),
   sap_info=>sap_info
)

export const grpidSelector = createSelector(
    state=>state.get("grpidInfo"),
    grpidInfo=>grpidInfo
 )


