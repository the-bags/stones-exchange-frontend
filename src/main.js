// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueResource from 'vue-resource'
import Quote from './components/Quote'
import Register from './components/Register'
import Space from "./components/Space";
import UserListPage from './components/UserListPage'
import router from './router'
import NavBar from './components/NavBar'
// import template from './templates/main.html'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  template: '<div><router-view></router-view></div>',
  components: { Quote, UserListPage, Space }
})

new Vue({
  el: '#app',
  router,
  template: '<div><router-view></router-view></div>',
  components: { Quote, NavBar, Register }
})
