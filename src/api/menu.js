import { get, post, del, put} from '@/util/request'


export const getMenuList = (params) => {
    return get('/menu/getMenuListAll', params)
}
export const getMenuListAll = (params) => {
    return get('/menu/getMenuListAll', params)
}

export const addMenu = (params) => {
    return post('/menu', params)
}

export const delMenuList = (params) => {
    return del('/menu', params)
}

export const changeMenu = (params) => {
    return put('/menu', params)
}