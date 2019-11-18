import { adminConstants } from '../_constants';

export function admin(state = {}, action) {
  switch (action.type) {
    case adminConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case adminConstants.GETALL_SUCCESS:
      return {
        type: adminConstants.GETALL_SUCCESS,
        result: action.result
      };
    case adminConstants.GETALL_FAILURE:
      return { 
        type: adminConstants.GETALL_FAILURE,
        error: action.error
      };
    case adminConstants.GETONE_REQUEST:
      return {
        loading: true
      };
    case adminConstants.GETONE_SUCCESS:
      return {
        type: adminConstants.GETONE_SUCCESS,
        result: action.result
      };
    case adminConstants.GETONE_FAILURE:
      return { 
        type: adminConstants.GETONE_FAILURE,
        error: action.error
      };
    default:
      return state
  }
}