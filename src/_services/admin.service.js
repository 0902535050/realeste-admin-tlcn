import axios from 'axios';

import { authHeader } from '../_helpers';
import { Host } from './host';

export const adminService = {
    getOne,
    update,
    create,
    verify,
    changePassword,
    changeAvatar,
    statisticData
};


function getOne(id) {
    return new Promise((resolve,reject) => {
        axios.get(Host + '/admin/' + id, {headers: authHeader()})
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

function update(admin) {
    return new Promise((resolve,reject) => {
        axios.post(Host + '/admin/edit', admin, {headers: authHeader()})
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

function create(admin) {
    return new Promise((resolve,reject) => {
        axios.post(Host + '/admin/signup', admin, {headers: authHeader()})
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

function verify(postParam) {
    return new Promise((resolve,reject) => {
        axios.post(Host + '/admin/verify', postParam)
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

function changePassword(postParam) {
    return new Promise((resolve,reject) => {
        axios.post(Host + '/admin/changepassword', postParam, {headers: authHeader()})
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

function changeAvatar(postParam) {
    return new Promise((resolve,reject) => {
        axios.post(Host + '/admin/changeavatar', postParam, {headers: authHeader()})
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

function statisticData() {
    return new Promise((resolve,reject) => {
        axios.post(Host + '/admin/statisticdata',{}, {headers: authHeader()})
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
