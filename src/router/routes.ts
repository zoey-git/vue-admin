const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/user/login.vue')
    },
    {
      path: '/',
      component: () => import('@/views/layout/index.vue'),
      redirect: '/home',
      name: '首页',
      children: [
        { path: 'home', meta: { title: "首页" },
          component: () => import('@/views/home/index.vue') }
      ]
    },
    {
        path: '/404',
        component: () => import('@/views/404.vue')
    }
  ]

  export default routes