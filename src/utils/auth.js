import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export const getStaffNumber = () => {
  return localStorage.getItem('name')
}

export const getTokenFromLocal = () => {
  return localStorage.getItem('token')
}