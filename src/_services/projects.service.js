import axios from 'axios';

import { authHeader } from '../_helpers';
import { Host } from './host';

export const projectService = {
    getAll,
    getOne,
    add,
    update,
    delete: _delete,
    changeVerify,
    changeAllowComment,
    getAllComment,
};

function getAll(page) {
    return new Promise((resolve,reject) => {
        axios.get(Host + '/manageProject/all/' + page, {headers: authHeader()})
        .then(res => {
            if(res.data.status === 200) {
                resolve(res.data);
            } else {
                reject(res.data)
            } 
        })
        .catch(err => reject(err.response))
    });
}

function getOne(id) {
    return new Promise((resolve,reject) => {
        axios.get(Host + '/manageProject/' + id, {headers: authHeader()})
        .then(res => {
            if(res.data.status === 200) {
                resolve(res.data);
            } else {
                reject(res.data)
            } 
        })
        .catch(err => reject(err.response))
    });
}

function add(project) {
    return new Promise((resolve,reject) => {
        axios.post(Host + '/manageProject', project, {headers: authHeader()})
        .then(res => {
            if(res.data.status === 201) {
                resolve(res.data);
            } else {
                reject(res.data)
            } 
        })
        .catch(err => reject(err.response))
    });
}

function update(id, project) {
    return new Promise((resolve,reject) => {
        axios.post(Host + '/manageProject/edit/' + id, project, {headers: authHeader()})
        .then(res => {
            if(res.data.status === 200) {
                resolve(res.data);
            } else {
                reject(res.data)
            } 
        })
        .catch(err => reject(err.response))
    });
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return new Promise((resolve,reject) => {
        axios.delete(Host + '/manageProject/' + id, {headers: authHeader()})
        .then(res => {
            if(res.data.status === 200) {
                resolve(res.data);
            } else {
                reject(res.data)
            } 
        })
        .catch(err => reject(err.response))
    });
}

function changeVerify(id, params) {
    return new Promise((resolve,reject) => {
        axios.post(Host + '/manageProject/changeVerify/' + id, params, {headers: authHeader()})
        .then(res => {
            if(res.data.status === 200) {
                resolve(res.data)
            } else {
                reject(res.data)
            }
        })
        .catch(err => reject(err.response))
    });
}

function changeAllowComment(id, params) {
    return new Promise((resolve,reject) => {
        axios.post(Host + '/manageProject/changeAllowComment/' + id, params, {headers: authHeader()})
        .then(res => {
            if(res.data.status === 200) {
                resolve(res.data)
            } else {
                reject(res.data)
            }
        })
        .catch(err => reject(err.response))
    });
}

function getAllComment(id) {
    return new Promise((resolve,reject) => {
        axios.get(Host + '/manageProject/allcomment/' + id, {headers: authHeader()})
        .then(res => {
            if(res.data.status === 200) {
                resolve(res.data)
            } else {
                reject(res.data)
            }
        })
        .catch(err => reject(err.response))
    });
}
