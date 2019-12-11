import { get, post, del, put} from '@/util/request'


export const getRoleList = (params) => {
    return get('/role', params)
}
export const addRole = (params) => {
    return post('/role', params)
}


export const addRoleMenu = (params) => {
    return post('/role/roleMenu', params)
}

export const getRoleMenu = (params) => {
    return get('/role/roleMenu', params)
}