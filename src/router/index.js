import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import NavBar from '@/components/NavBar'
import Quote from '@/components/Quote'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "Quote",
      component: Quote
    },
    {
      path: "/space",
      name: "Space",
      component: Space
    },
    {
      path: '/users',
      name: 'UserList',
      component: UserListPage
    },
    {
      path: '/sign-in',
      name: 'Register',
      component: Register
    },
    {
      path: '/test',
      name: 'NavBar',
      component: NavBar
    }
  ]
})
