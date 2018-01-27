import Vue from 'vue'
import Router from 'vue-router'

const app = () => import('@/components/app.vue')
const register = () => import('@/components/register.vue')

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/home',
      component: app,
      children: [
        { path: 'register', component: register }
        // { path: 'login', component: login }
      ]
    }
  ]
})
