import Vue from 'vue'
import Router from 'vue-router'

import Hello from '@/components/Hello'
import UserListPage from '../components/UserListPage'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/users',
      name: 'UserList',
      component: UserListPage
    }
  ]
})
