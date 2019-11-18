import { adminConstants } from '../_constants';
import { adminService } from '../_services';
// import { alertActions } from '.';
// import { history } from '../_helpers';

export const adminActions = {
    // getAll,
    getOne,
    // delete: _delete,
    // register,
};

function getOne(id) {
    return dispatch => {
        dispatch(request());
        adminService.getOne(id)
        .then(result => {
            dispatch(success(result))
        })
        .catch(error => {
            dispatch(failure(error))
        });
    };

    function request() { return { type: adminConstants.GETONE_REQUEST } }
    function success(result) { return { type: adminConstants.GETONE_SUCCESS, result } }
    function failure(error) { return { type: adminConstants.GETONE_FAILURE, error } }
}
