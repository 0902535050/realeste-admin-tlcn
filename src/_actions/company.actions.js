import { companyConstants } from '../_constants';
import { companyService } from '../_services';
// import { alertActions } from '.';
// import { history } from '../_helpers';

export const companyActions = {
    getAll,
    getOne,
    // delete: _delete,
    // register,
};

function getAll(page) {
    return dispatch => {
        dispatch(request());
        companyService.getAll(page)
        .then(result => {
            dispatch(success(result))
        })
        .catch(error => {
            dispatch(failure(error))
        });
    };

    function request() { return { type: companyConstants.GETALL_REQUEST } }
    function success(result) { return { type: companyConstants.GETALL_SUCCESS, result } }
    function failure(error) { return { type: companyConstants.GETALL_FAILURE, error } }
}

function getOne(id) {
    return dispatch => {
        dispatch(request());
        companyService.getOne(id)
        .then(result => {
            dispatch(success(result))
        })
        .catch(error => {
            dispatch(failure(error))
        });
    };

    function request() { return { type: companyConstants.GETONE_REQUEST } }
    function success(result) { return { type: companyConstants.GETONE_SUCCESS, result } }
    function failure(error) { return { type: companyConstants.GETONE_FAILURE, error } }
}
