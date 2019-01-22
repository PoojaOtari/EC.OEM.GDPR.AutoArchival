import { createSelector } from 'reselect';

export const QueryValidationSelector = createSelector(
   state=>state.get("result"),
   result=>result
)

export const DelQueryValidationSelector = createSelector(
    state=>state.get("resultdel"),
    resultdel=>resultdel
 )