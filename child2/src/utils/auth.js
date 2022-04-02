import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const OrgKey = "org"
const UserInfo = 'userInfo'
const FloorInfo = 'floorInfo'
const ACCOUNT_TYPE = 'account_type'
const Org = 'orginfo';
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

export function setFloorInfo(floorInfo){
   return Cookies.set(FloorInfo,floorInfo);
}
export function getFloorInfo(){
  return Cookies.get(FloorInfo);
}
export function removeFloorInfo() {
  return Cookies.remove(FloorInfo)
}
export function setAccount_type(acc_type){
    return Cookies.set(ACCOUNT_TYPE,acc_type);
}

export function getAccount_type(){
    return Cookies.get(ACCOUNT_TYPE);
}
export function removeAccount_type(){
  return Cookies.remove(ACCOUNT_TYPE);
}
export function setOrgmsg(org){
  return Cookies.set(ACCOUNT_TYPE,org);
}

export function getOrgmsg(){
  return Cookies.get(ACCOUNT_TYPE);
}
export function removeOrgmsg(){
return Cookies.remove(ACCOUNT_TYPE);
}