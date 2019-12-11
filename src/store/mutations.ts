import { SET_MENU_LIST, SET_ROUTES } from './types'

export default {
    [SET_MENU_LIST](state: any, menuList: any[]) {
        state.menuList = menuList
    },
    [SET_ROUTES](state: any, routes: any) {
        state.routes = routes
    }
}