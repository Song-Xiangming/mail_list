/* global localStorage, sessionStorage */

/*
    sessionStorage存储注册状态与登陆状态
    localstorage存储已注册用户信息
*/
const REGISTER = 'REGISTER' // 注册
const SIGN_IN = 'SIGN_IN' // 登录

export default {
  state: {},
  mutations: {
    [REGISTER] (state, user) {
      // 判断是否同姓名
      let duplication = 0
      for (var i = 0; i < localStorage.length; i++) {
        // 判断是否为用户
        if (localStorage.key(i).indexOf('user') !== -1) {
          if (JSON.parse(localStorage.getItem(localStorage.key(i))).name === user.name) {
            duplication = 1
            break
          }
        }
      }
      if (duplication === 0) {
        // 添加本地存储用户
        localStorage.setItem(`user${localStorage.length}`, JSON.stringify(user))
        sessionStorage.register = 1 // 注册成功
      } else {
        sessionStorage.register = 0
      }
    },
    [SIGN_IN] (state, user) {
      let localUser = ''
      let isExist = 0
      for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).indexOf('user') !== -1) {
          if (JSON.parse(localStorage.getItem(localStorage.key(i))).name === user.name) {
            localUser = JSON.parse(localStorage.getItem(localStorage.key(i)))
            isExist = 1
            break
          }
        }
      }
      if (isExist && user.psw === localUser.psw) {
        sessionStorage.login = 1 // 登陆成功
        sessionStorage.user = JSON.stringify(localUser)
        sessionStorage.userId = localStorage.key(i)
      } else {
        sessionStorage.login = 0
      }
    }
  },
  actions: {
    // 触发注册操作
    register ({ commit }, user) {
      commit(REGISTER, user)
    },
    signIn ({ commit }, user) {
      commit(SIGN_IN, user)
    }
  }
}
