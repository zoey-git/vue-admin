import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
import { SET_ROUTES } from '@/store/types'
import routes from './routes'
const { getToken } = require('@/util/index.ts')

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

router.beforeEach((to, from, next) => {
  let i = 0;
  if (getToken().token) {
    if (to.path === '/login') {
      next()
    } else {
      if(store.getters.routes.length === 0 && i < 20) {
          i++
          store.dispatch(SET_ROUTES).then(route => {
            router.addRoutes(route);
            next({ ...to, replace: true })
          })
      } else {
        next()  //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
