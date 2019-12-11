import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
import { SET_ROUTES } from '@/store/types'

const { getToken } = require('@/util/index.js')

Vue.use(VueRouter)

import Layout from '@/views/layout/index.vue'
import Home from '@/views/home/index.vue'
import Login from '@/views/user/login.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        meta: {
          title: "首页"
        },
        component: Home
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (getToken().token) {
    if (to.path === '/login') {
      next()
    }
    if(store.getters.routes.length === 0) {
      store.dispatch(SET_ROUTES).then(res => {
        router.options.routes[0].children.push(...res)
        router.addRoutes(router.options.routes);
        next()
      })
    }else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    }
    next('/login')
  }
})

export default router
