import { login, logout, getInfo, getRouters } from '@/api/login'
import { getToken, setToken, removeToken,setAdminId } from '@/utils/auth'
import routes from '@/router'
import store from '@/store'
import MenuUtils from '@/utils/MenuUtils'
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    adminid:''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ADMINID: (state, adminid) => {
      state.adminid = adminid
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      console.log('账号：' + userInfo.username, '密码：' + userInfo.password)
      return new Promise((resolve, reject) => {
        console.log('0：' + '请求接口')
        login(username, userInfo.password).then(response => { // 登录成功后返回
          console.log('1：登录成功后拿到token' + JSON.stringify(response))
          const data = response.data
          setToken(data)
          commit('SET_TOKEN', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.Authorization).then(response => {
          const data = response.data
          // getRouters(data.id).then(res => {
          //   var str
          //   str = JSON.stringify(res.data)
          //   const routes = []
          //   MenuUtils(routes, res.data)
          //   console.log(1)
          //   router.addRoutes(routes)
          //   console.log(2)
          //   // store.dispatch('GenerateRoutes', str).then(() => { // 根据roles权限生成可访问的路由表
          //   //   routes.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          //   // })
          //   // commit('SET_ROLES', routers.rows)
          // }).catch(errorer => {
          //   reject(errorer)
          // })
          setAdminId(data.id)
          commit('SET_ADMINID', data.id)
          commit('SET_NAME', data.username)
          commit('SET_ROLES', data.name)
          // // commit('SET_AVATAR', )
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.Authorization).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
