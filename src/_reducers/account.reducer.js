import { accountConstants } from '../_constants';

export function account(state = {}, action) {
  switch (action.type) {
    case accountConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case accountConstants.GETALL_SUCCESS:
      return {
        type: accountConstants.GETALL_SUCCESS,
        result: action.result
      };
    case accountConstants.GETALL_FAILURE:
      return {
        type: accountConstants.GETALL_FAILURE,
        error: action.error
      };
    case accountConstants.GETONE_REQUEST:
      return {
        loading: true
      };
    case accountConstants.GETONE_SUCCESS:
      return {
        type: accountConstants.GETONE_SUCCESS,
        result: action.result
      };
    case accountConstants.GETONE_FAILURE:
      return { 
        type: accountConstants.GETONE_FAILURE,
        error: action.error
      };
    default:
      return state
  }
}