import axios from 'axios';

import { authHeader } from '../_helpers';
import { Host } from './host';

export const userService = {
    login,
    logout,
    getAll,
    getOne,
    update,
    delete: _delete,
    changeLock,
    changePermission,
};

function login(email, password) {
    const headers = {
        "Access-Control-Allow-Origin": "*",
    }
    const postParam = {
        email: email,
        password: password
    };
    return new Promise((resolve,reject) => {
        axios.post(Host + '/admin/login', postParam, headers)
        .then(res => {
            if(res.data.status === 200) {
                localStorage.setItem('user', JSON.stringify(res.data));
                resolve(res.data);
            } else {
                reject(res.data)
            } 
        })
        .catch(err => reject(err))
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll(page) {
    return new Promise((resolve,reject) => {
        axios.get(Host + '/manageAccount/all/' + page, {headers: authHeader()})
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
        axios.get(Host + '/manageAccount/' + id, {headers: authHeader()})
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

function update(id, account) {
    return new Promise((resolve,reject) => {
        axios.post(Host + '/manageAccount/edit/' + id, account, {headers: authHeader()})
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
        axios.delete(Host + '/manageAccount/' + id, {headers: authHeader()})
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
        axios.post(Host + '/manageAccount/changeLock/' + id, params, {headers: authHeader()})
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

function changePermission(id, params) {
    return new Promise((resolve,reject) => {
        axios.post(Host + '/manageAccount/changePermission/' + id, params, {headers: authHeader()})
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
