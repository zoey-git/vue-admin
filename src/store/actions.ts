import { SET_MENU_LIST, SET_ROUTES, LOG_OUT, SET_IS_COLLAPSE } from './types'

const { getMenuList } = require('../api/menu.js')

interface Object {
    code: number,
    data: Array<menu>,
    msg?: any
}

interface user {
    token: string,
    userName: string,
    userId: string
}

interface route {
    path: string,
    component?: () => any,
    redirect?: string,
    name?: string,
    meta?: { title: string },
    children?: Array<route>,
}

interface menu {
    id: string,
    parentId: string,
    title: string
    url?: string,
    icon?: string,
}


export default {
    [SET_MENU_LIST]({state, commit}: any) {
        let user: user = JSON.parse(localStorage.getItem('user') || '{}')
        let params: { userId: string } = {
            userId: user.userId
        }
        return new Promise((resolve, reject) => {
            getMenuList(params).then((res: Object):void => {
                if (res.code === 200) {                
                    let menuList: Array<menu> = res.data
                    localStorage.setItem('menuList', JSON.stringify(menuList))
                    commit(SET_MENU_LIST, menuList)
                    resolve(res)
                } else {
                    reject(res)
                }
            })
        })
    },
    [SET_ROUTES]({state, commit}: any): Array<route>{
        let menuList: Array<menu> = state.menuList.length > 0 ? state.menuList : JSON.parse(localStorage.getItem('menuList') || '[]')
        let menus: route[] = []
        let route: route[] = [
            {
                path: '/',
                component: () => import('@/views/layout/index.vue'),
                redirect: '/home',
                name: '首页',
                children: [ { path: 'home', meta: { title: "首页" }, component: () => import('@/views/home/index.vue') } ]
            },
            { path: '*', redirect: '/404' }
        ]
        menuList.map((item: menu) => {
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
        route[0].children && route[0].children.push(...menus)
        commit(SET_ROUTES, route)
        return route
    },
    [LOG_OUT]({state, commit}: any):any {
        commit(LOG_OUT)
    },
    [SET_IS_COLLAPSE]({ state, commit}: any): any {
        let type = state.isCollapse
        commit(SET_IS_COLLAPSE, !type)
    }
}