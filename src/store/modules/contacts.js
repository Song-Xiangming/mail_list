/* global localStorage, sessionStorage */
import router from '../../router'

const USER_INIT = 'USER_INIT' // mailList初始化

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
        items = JSON.stringify(items)
        localStorage.setItem('items', items)
        var own = JSON.parse(sessionStorage.user)

        commit(USER_INIT, {
          items,
          own
        })
      } else {
        window.alert('请先登录~')
        router.replace('/home/login')
      }
    }
    // userAdd
  }
}
