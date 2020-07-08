import { get, post, del, put} from '@/util/request'


export const getDemoList = (params) => {
    return get('/demo', params)
}
export const addDemo = (params) => {
    return post('/demo', params)
}
export const updateDemo = (params) => {
    return post('/demo/update', params)
}
