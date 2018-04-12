import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

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
    }
  ]
});
