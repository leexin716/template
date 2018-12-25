import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Layout from '../views/layout/Layout'
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/index',
    hidden: true,
    children: [{
      path: 'index',
      name: 'Index',
      component: () => import('@/views/index/index'),
      meta: {
        title: '首页',
        icon: 'password'
      }
    }]
  },

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
      },
      {
        path: 'two',
        component: () => import('@/views/example/two'),
        name: 'two',
        meta: {
          title: '菜单2',
          icon: 'tree'
        },
      }
    ]
  },

  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

let router = new Router({
  base: '/',
  //mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
});

router.beforeEach((to,from,next) => {
  let routeName = to.meta.title || to.title;
  window.document.title = (routeName ? routeName + ' - ' : '') + 'vue';
  next();
})

export default router
