import { accountConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from '.';
// import { history } from '../_helpers';

export const authenticationActions = {
    login,
    logout,
};

function login(email, password) {
    return dispatch => {
        dispatch(request( email ));
        userService.login(email, password)
        .then(user => { 
            dispatch(success(user));
            dispatch(alertActions.success('login success'));
        })
        .catch(error => {
            dispatch(failure(error));
            dispatch(alertActions.error('login fail'));
        });
    };
    function request(email) { return { type: accountConstants.LOGIN_REQUEST, email } }
    function success(user) { return { type: accountConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: accountConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return dispatch => {
        dispatch(logout());
    }
    function logout() { return { type: accountConstants.LOGOUT } }
}
