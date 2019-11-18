import axios from 'axios';

import { authHeader } from '../_helpers';
import { Host } from './host';

export const newsService = {
    getAll,
    getOne,
    add,
    update,
    delete: _delete,
};

function getAll(page) {
    return new Promise((resolve,reject) => {
        axios.get(Host + '/manageNews/all/' + page, {headers: authHeader()})
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
        axios.get(Host + '/manageNews/' + id, {headers: authHeader()})
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

function add(news) {
    return new Promise((resolve,reject) => {
        axios.post(Host + '/manageNews', news, {headers: authHeader()})
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

function update(id, news) {
    return new Promise((resolve,reject) => {
        axios.post(Host + '/manageNews/edit/' + id, news, {headers: authHeader()})
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
        axios.delete(Host + '/manageNews/' + id, {headers: authHeader()})
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
