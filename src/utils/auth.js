import Cookies from 'js-cookie'

const TokenKey = 'Authorization'
const username = 'username'

const name = 'name'

const mobile = 'mobile'
const openId = 'openId'
const AdminId = 'adminid'





export function getToken() {
  return Cookies.get(TokenKey)
}
export function getAdminId() {
  return Cookies.get(AdminId)
}

// export function getTokenAll() {
//   let elp = ''
//   return elp = {
//     TokenKey: Cookies.get('Authorization'),
//     username: Cookies.get('username'),
//     name: Cookies.get('name'),
//     mobile: Cookies.get('mobile'),
//     id: Cookies.get('id'),
//     openId: Cookies.get('openId')
//   }
// }

// export function setToken(Authorization, username, name, mobile, id) {
//   let elp = ''
//   return elp = {
//     'Authorization': Cookies.set('Authorization', Authorization),
//     'username': Cookies.set('username', username),
//     'name': Cookies.set('name', name),
//     'mobile': Cookies.set('mobile', mobile),
//     'id': Cookies.set('id', id),
//     "openId": Cookies.set('openId', id)

//   }
// }

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function setAdminId(id) {
  return Cookies.set(AdminId, id)
}

export function removeToken() {
  Cookies.remove(AdminId)
  Cookies.remove(TokenKey)
}

