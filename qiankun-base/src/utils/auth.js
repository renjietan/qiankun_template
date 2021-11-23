import Cookies from 'js-cookie'

const OrgKey = "org"
const TokenKey = 'Admin-Token'

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