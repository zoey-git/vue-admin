import { get, post, del, put} from '@/util/request'


export const getPhoto = (params) => {
    return get('/img/api/shibes', params)
}

export const login = (params) => {
    return post('/user/login', params)
}
export const register = (params) => {
    return post('/user/register', params)
}