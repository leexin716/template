import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/admin/signIn?username=' + username + "&password=" + password,
    method: 'post'
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/info',
    method: 'get',
    params: { token }
  })
}

export function getRouters(adminId) {
  return request({
    url: '/resource/tree/' + adminId,
    method: 'get',
    headers: {
      'Accept': 'application/json'
    }
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'PUT'
  })
}
