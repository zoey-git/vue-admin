import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Layout from '@/views/layout/index.vue'
import Home from '@/views/home/index.vue'
import Menu from '@/views/menu/index.vue'
import Role from '@/views/role/index.vue'
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
      },
      {
        path: '/menu',
        meta: {
          title: "菜单"
        },
        component: Menu
      },
      {
        path: '/role',
        meta: {
          title: "角色",
        },
        component: Role
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

export default router
