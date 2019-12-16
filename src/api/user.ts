import { get, post, del, put} from '@/util/request'

interface loginParams {
    userName: string,
    password: string
}
interface photoParams {
    count: number,
    urls: boolean,
    https: boolean
}


export const getPhoto = (params: photoParams) => {
    return get('/img/api/shibes', params)
}

export const login = (params: loginParams) => {
    return post('/user/login', params)
}
export const register = (params: loginParams) => {
    return post('/user/register', params)
}