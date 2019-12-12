import store from './index'
import { SET_MENU_LIST } from './types'

export default {
    menuList: (state: any):any => {
        return state.menuList.length > 0 ? state.menuList.length : JSON.parse(localStorage.getItem('menuList') || '[]')
    },
    routes: (state: any): any => state.routes,
    user: (state:any): any => state.user
}