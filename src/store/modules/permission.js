import { constantRouterMap } from '@/router'
import Layout from '../../views/layout/Layout'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      var routersArr = JSON.parse(routers)
      for (var i = 0; i < routersArr.length; i++) {
        routersArr[i].component = Layout
        if (routersArr[i].children.length > 0) {
          for (var j = 0; j < routersArr[i].children.length; j++) {
            var routersComponent = routersArr[i].children[j].component
            routersArr[i].children[j].component = () => import(routersComponent.substring(routersComponent.lastIndexOf('(') + 2, routersComponent.lastIndexOf(')') - 1) + '.vue')
          }
        }
      }
      state.addRouters = routersArr
      state.routers = constantRouterMap.concat(routersArr)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        commit('SET_ROUTERS', data)
        resolve()
      })
    }
  }
}

export default permission
