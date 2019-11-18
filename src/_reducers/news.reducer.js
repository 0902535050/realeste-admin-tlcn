import { newsConstants } from '../_constants';

export function news(state = {}, action) {
  switch (action.type) {
    case newsConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case newsConstants.GETALL_SUCCESS:
      return {
        type: newsConstants.GETALL_SUCCESS,
        result: action.result
      };
    case newsConstants.GETALL_FAILURE:
      return { 
        type: newsConstants.GETALL_FAILURE,
        error: action.error
      };
    case newsConstants.GETONE_REQUEST:
      return {
        loading: true
      };
    case newsConstants.GETONE_SUCCESS:
      return {
        type: newsConstants.GETONE_SUCCESS,
        result: action.result
      };
    case newsConstants.GETONE_FAILURE:
      return { 
        type: newsConstants.GETONE_FAILURE,
        error: action.error
      };
    default:
      return state
  }
}