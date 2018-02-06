/* global localStorage, sessionStorage */
import router from '../../router'

const USER_INIT = 'USER_INIT' // mailList初始化
const USER_ADD = 'USER_ADD' // 添加联系人
const USER_REMOVE = 'USER_REMOVE'
const USER_CHANGE = 'USER_CHANGE'
const OWN_CHANGE = 'OWN_CHANGE'

var contactId = 0

export default {
  state: {
    items: [],
    own: {}
  },
  mutations: {
    [USER_INIT] (state, info) {
      state.items = info.items
      state.own = info.own
    },
    [USER_ADD] (state, user) {
      state.items.push(user)
    },
    [USER_REMOVE] (state, userId) {
      state.items = state.items.filter(item => item.id !== userId)
    },
    [USER_CHANGE] (state, user) {
      state.items.forEach(item => {
        if (item.id === user.id) {
          item.name = user.name
          item.tel = user.tel
        }
      })
    },
    [OWN_CHANGE] (state, user) {
      state.own = user
    }
  },
  actions: {
    userInit ({ commit }) {
      // 页面加载时获取数据
      if (sessionStorage.login && sessionStorage.login === '1') {
        var items = [
          {name: '妈妈', tel: 1234555656, status: '亲人'},
          {name: 'nic', tel: 1234555656, status: '朋友'},
          {name: '爸爸', tel: 1234555656, status: '亲人'},
          {name: 'wind', tel: 1234555656, status: '朋友'},
          {name: 'lily', tel: 1234555656, status: '同学'},
          {name: '爷爷', tel: 1234555656, status: '亲人'},
          {name: 'tom', tel: 1234555656, status: '同学'},
          {name: 'tom', tel: 1234555656, status: '同学'},
          {name: 'tom', tel: 1234555656, status: '同学'},
          {name: 'tom', tel: 1234555656, status: '同学'},
          {name: '外婆', tel: 1234555656, status: '亲人'},
          {name: 'tom', tel: 1234555656, status: '同学'},
          {name: 'tom', tel: 1234555656, status: '同学'},
          {name: 'tom', tel: 1234555656, status: '同学'},
          {name: '外婆', tel: 1234555656, status: '亲人'}
        ]
        items.forEach(item => {
          item.id = contactId++
          item.imgSrc = '/static/img/userImg.png'
        })
        localStorage.setItem('items', JSON.stringify(items))
        var own = JSON.parse(sessionStorage.user)

        commit(USER_INIT, {
          items,
          own
        })
      } else {
        window.alert('请先登录~')
        router.replace('/home/login')
      }
    },
    userAdd ({ commit }, user) {
      user.id = contactId++
      user.imgSrc = '/static/img/userImg.png'
      let items = JSON.parse(localStorage.getItem('items'))
      items.push(user)
      localStorage.setItem('items', JSON.stringify(items))
      commit(USER_ADD, user)
    },
    userRemove ({ commit }, userId) {
      commit(USER_REMOVE, userId)
    },
    userChange ({ commit }, user) {
      commit(USER_CHANGE, user)
    },
    ownChange ({ commit }, user) {
      sessionStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem(sessionStorage.userId, JSON.stringify(user))
      commit(OWN_CHANGE, user)
    }
  }
}
