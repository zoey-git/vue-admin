const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/user/login.vue')
    },
    {
        path: '/404',
        component: () => import('@/views/404.vue')
    }
  ]

  export default routes