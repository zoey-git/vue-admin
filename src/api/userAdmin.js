import { get, post, del, put} from '@/util/request'


export const getUserList = (params) => {
    return get('/user', params)
}

export const addUser = (params) => {
    return post('/user/register', params)
}

export const userChange = (params) => {
    return post('/user/userChange', params)
}