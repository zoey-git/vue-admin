import { SET_MENU_LIST, SET_ROUTES } from './types'

const { getMenuList } = require('../api/menu.js')

interface Object {
    code: number,
    data: any[]
}

export default {
    [SET_MENU_LIST]({state, commit}: any) {
        let user = JSON.parse(localStorage.getItem('user') || '{}')
        let params = {
            userId: user.userId
        }
        getMenuList(params).then((res: Object) => {
            if (res.code === 200) {
                let menuList: any[] = res.data
                localStorage.setItem('menuList', JSON.stringify(menuList))
                commit(SET_MENU_LIST, menuList)
            }
        })
    },
    [SET_ROUTES]({state, commit}: any) {
        let menuList = state.menuList.length > 0 ? state.menuList : JSON.parse(localStorage.getItem('menuList') || '[]')
        let menus: any[] = []
        menuList.map((item: any) => {
            if (item.url) {
                menus.push({
                    path: item.url,
                    meta: {
                        title: item.title,
                    },
                    component: () => import(`@/views${item.url}/index.vue`)
                })
            }
        })
        menus.push({ path: '*', redirect: '/404' })
        commit(SET_ROUTES, menus)
        return menus
    }
}