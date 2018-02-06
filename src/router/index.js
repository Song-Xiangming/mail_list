import Vue from 'vue'
import Router from 'vue-router'

// lazyLoad
const app = () => import('@/components/app.vue')
const register = () => import('@/components/register.vue')
const login = () => import('@/components/login.vue')

const mailList = () => import('@/components/mailList.vue')
const notes = () => import('@/components/notes.vue')
const addCon = () => import('@/components/addCon.vue')
const own = () => import('@/components/own.vue')

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
      component: mailList,
      children: [
        {
          path: '',
          component: notes,
          meta: { logined: true }
        },
        { path: 'add', component: addCon },
        { path: 'own', component: own }
      ]
    }
  ]
})
