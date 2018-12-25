import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import Layout from './views/layout/Layout'
import { constantRouterMap } from '@/router'
const asyncRouters = [
  {
    path: '/example',
    name: 'example',
    component: Layout,
    redirect: '/example/one',
    meta: {
      title: '菜单',
      icon: 'example'
    },
    children: [
      {
        path: 'one',
        component: () => import('@/views/example/one'),
        name: 'one',
        meta: {
          title: '菜单1',
          icon: 'tree'
        },
      }
    ]
  }
]
const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  NProgress.start()
  let newRouters = constantRouterMap.concat(asyncRouters)
  // console.log(newRouters)
  router.addRoutes(store.getters.addRouters) 
  next()
  NProgress.done()
  // if (getToken()) {
  //   if (to.path === '/login') {
  //     next({ path: '/' })
  //     NProgress.done()
  //   } else {
  //     router.addRoutes(asyncRouters)
  //     next()
  //   }
  // } else {
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     next()
  //   } else {
  //     next('/login')
  //     NProgress.done()
  //   }
  // }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
