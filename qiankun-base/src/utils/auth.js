import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const OrgKey = "org"
const UserInfo = 'userInfo'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getOrgInfo() {
  return Cookies.get(OrgKey) ? JSON.parse(Cookies.get(OrgKey)) : Cookies.get(OrgKey)
}

export function setOrgInfo(token) {
  return Cookies.set(OrgKey, token)
}

export function removeOrgInfo() {
  return Cookies.remove(OrgKey)
}

export function getUserInfo() {
  return Cookies.get(UserInfo)
}

export function setUserInfo(userInfo) {
  
  return Cookies.set(UserInfo, userInfo)
}
export function removeUserInfo() {
  return Cookies.remove(UserInfo)
}