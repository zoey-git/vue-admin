import { get, post, del, put} from '@/util/request'


export const getRoleList = (params) => {
    return get('/role', params)
}
