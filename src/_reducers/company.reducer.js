import { companyConstants } from '../_constants';

export function company(state = {}, action) {
  switch (action.type) {
    case companyConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case companyConstants.GETALL_SUCCESS:
      return {
        type: companyConstants.GETALL_SUCCESS,
        result: action.result
      };
    case companyConstants.GETALL_FAILURE:
      return { 
        type: companyConstants.GETALL_FAILURE,
        error: action.error
      };
    case companyConstants.GETONE_REQUEST:
      return {
        loading: true
      };
    case companyConstants.GETONE_SUCCESS:
      return {
        type: companyConstants.GETONE_SUCCESS,
        result: action.result
      };
    case companyConstants.GETONE_FAILURE:
      return { 
        type: companyConstants.GETONE_FAILURE,
        error: action.error
      };
    default:
      return state
  }
}