import { projectConstants } from '../_constants';
import { projectService } from '../_services';
// import { alertActions } from '.';
// import { history } from '../_helpers';

export const projectActions = {
    getAll,
    getOne,
    // delete: _delete,
    // register,
};

function getAll(page) {
    return dispatch => {
        dispatch(request());
        projectService.getAll(page)
        .then(result => {
            dispatch(success(result))
        })
        .catch(error => {
            dispatch(failure(error))
        });
    };

    function request() { return { type: projectConstants.GETALL_REQUEST } }
    function success(result) { return { type: projectConstants.GETALL_SUCCESS, result } }
    function failure(error) { return { type: projectConstants.GETALL_FAILURE, error } }
}

function getOne(id) {
    return dispatch => {
        dispatch(request());
        projectService.getOne(id)
        .then(result => {
            dispatch(success(result))
        })
        .catch(error => {
            dispatch(failure(error))
        });
    };

    function request() { return { type: projectConstants.GETONE_REQUEST } }
    function success(result) { return { type: projectConstants.GETONE_SUCCESS, result } }
    function failure(error) { return { type: projectConstants.GETONE_FAILURE, error } }
}
