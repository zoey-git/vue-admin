import { SET_MENU_LIST, SET_ROUTES, LOG_OUT } from './types'
import router from '../router/index'

export default {
    [SET_MENU_LIST](state: any, menuList: any[]) {
        state.menuList = menuList
    },
    [SET_ROUTES](state: any, routes: any) {
        state.routes = routes
    },
    [LOG_OUT](state: any) {
        localStorage.setItem('user', '')
        localStorage.setItem('menuList', '')
        router.replace({
            path: '/login'
        })
    }
}