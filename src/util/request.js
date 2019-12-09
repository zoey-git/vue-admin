import axios from 'axios'
import router from '../router/index'
const BASE_URL = '/api'

axios.interceptors.request.use(config => {
    let data = localStorage.getItem('user') || '{}'
    let user = JSON.parse(data)
    if (user.token) {
        config.headers = {
            'Authorization': 'Bearer ' + user.token
        }
    }
    return config
})

axios.interceptors.response.use(res => {
    // token失效重新登录
    if (res.data.code === 302) {
        router.replace({
            path: '/login'
        })
    }
    return res
})



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


export const put = (url, params) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'PUT',
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

