import { projectConstants } from '../_constants';

export function project(state = {}, action) {
  switch (action.type) {
    case projectConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case projectConstants.GETALL_SUCCESS:
      return {
        type: projectConstants.GETALL_SUCCESS,
        result: action.result
      };
    case projectConstants.GETALL_FAILURE:
      return { 
        type: projectConstants.GETALL_FAILURE,
        error: action.error
      };
    case projectConstants.GETONE_REQUEST:
      return {
        loading: true
      };
    case projectConstants.GETONE_SUCCESS:
      return {
        type: projectConstants.GETONE_SUCCESS,
        result: action.result
      };
    case projectConstants.GETONE_FAILURE:
      return { 
        type: projectConstants.GETONE_FAILURE,
        error: action.error
      };
    default:
      return state
  }
}