import axios from 'axios';

import { authHeader } from '../_helpers';
import { Host } from './host';

export const companyService = {
    getAll,
    getOne,
    add,
    update,
    delete: _delete,
    changeLock,
};

function getAll(page) {
    return new Promise((resolve,reject) => {
        axios.get(Host + '/manageCompany/all/' + page, {headers: authHeader()})
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
        axios.get(Host + '/manageCompany/' + id, {headers: authHeader()})
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

function add(company) {
    console.log(company)
    return new Promise((resolve,reject) => {
        axios.post(Host + '/manageCompany', company, {headers: authHeader()})
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
        axios.post(Host + '/manageCompany/edit/' + id, project, {headers: authHeader()})
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
        axios.delete(Host + '/manageCompany/' + id, {headers: authHeader()})
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

function changeLock(id, params) {
    return new Promise((resolve,reject) => {
        axios.post(Host + '/manageCompany/changeLock/' + id, params, {headers: authHeader()})
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
