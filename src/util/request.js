import axios from 'axios'

const BASE_URL = '/api'
export const get = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + url, { params }).then(res => {
            resolve(res.data)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const post = (url, params) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url: BASE_URL + url,
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            data: params
        }).then(res => {
            resolve(res.data)
        }).catch((err) => {
            reject(err)
        })
    })
}


export const del = (url, params) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'DELETE',
            url: BASE_URL + url,
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            data: params
        }).then(res => {
            resolve(res.data)
        }).catch((err) => {
            reject(err)
        })
    })
}

