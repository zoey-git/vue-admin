import axios from 'axios'
import { getToken } from './index'
import { Message } from 'element-ui'
import store from '@/store/index'
import { LOG_OUT } from '@/store/types'
import { FilterChain, FilterParams } from './index'

const BASE_URL = '/api'

axios.interceptors.request.use(config => {
    let user = getToken()
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
        Message.error('登录过期，请重新登录');
        store.dispatch(LOG_OUT)
    }
    return res
})



export const get = (url: string, params: {}) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + url, { params }).then(res => {
            resolve(res.data)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const post = (url: string, params: {}) => {
    let filterChain = new FilterChain()
    filterChain.addFilter(new FilterParams())
    params = filterChain.doFilter(params)
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

export const del = (url: string, params: {}) => {
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


export const put = (url: string, params: {}) => {
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

