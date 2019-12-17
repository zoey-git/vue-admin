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
interface updateHeadParams {
    userId: String,
    headUrl: String
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
export const updateHead = (params: updateHeadParams) => {
    return post('/user/updateHead', params)
}