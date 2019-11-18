import { newsConstants } from '../_constants';
import { newsService } from '../_services';
// import { alertActions } from '.';
// import { history } from '../_helpers';

export const newsActions = {
    getAll,
    getOne,
    // delete: _delete,
    // register,
};

function getAll(page) {
    return dispatch => {
        dispatch(request());
        newsService.getAll(page)
        .then(result => {
            dispatch(success(result))
        })
        .catch(error => {
            dispatch(failure(error))
        });
    };

    function request() { return { type: newsConstants.GETALL_REQUEST } }
    function success(result) { return { type: newsConstants.GETALL_SUCCESS, result } }
    function failure(error) { return { type: newsConstants.GETALL_FAILURE, error } }
}

function getOne(id) {
    return dispatch => {
        dispatch(request());
        newsService.getOne(id)
        .then(result => {
            dispatch(success(result))
        })
        .catch(error => {
            dispatch(failure(error))
        });
    };

    function request() { return { type: newsConstants.GETONE_REQUEST } }
    function success(result) { return { type: newsConstants.GETONE_SUCCESS, result } }
    function failure(error) { return { type: newsConstants.GETONE_FAILURE, error } }
}
