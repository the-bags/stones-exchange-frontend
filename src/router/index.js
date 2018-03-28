import Vue from 'vue'
import Router from 'vue-router'
import NavBar from '@/components/NavBar'
import Quote from '@/components/Quote'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Quote',
      component: Quote
    },
    {
      path: '/test',
      name: 'NavBar',
      component: NavBar
    }
  ]
})
