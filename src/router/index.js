import Vue from 'vue'
import Router from 'vue-router'

// lazyLoad
const app = () => import('@/components/app.vue')
const register = () => import('@/components/register.vue')
const login = () => import('@/components/login.vue')

const mailList = () => import('@/components/mailList.vue')

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/home/login' },
    {
      path: '/home',
      component: app,
      children: [
        { path: 'register', component: register },
        { path: 'login', component: login }
      ]
    },
    {
      path: '/contacts',
      component: mailList
    }
  ]
})
