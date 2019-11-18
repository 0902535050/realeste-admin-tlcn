import { accountConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case accountConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        email: action.email,
      };
    case accountConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case accountConstants.LOGIN_FAILURE:
      return {
        loggedIn: false,
      };
    case accountConstants.LOGOUT:
      return {
        loggedOut: true,
      };
    default:
      return state
  }
}