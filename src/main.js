import Vue from 'vue';
import VueSocketio from 'vue-socket.io';
import BootstrapVue from 'bootstrap-vue';
import VueResource from 'vue-resource';
import Space from './components/Space';
import router from './router';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import Quote from './components/Quote';
import UserListPage from './components/UserListPage';

Vue.use(BootstrapVue);
Vue.use(VueResource);
Vue.use(VueSocketio, 'http://localhost:3002');

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<div><router-view></router-view></div>',
  components: { Quote, UserListPage, Space, NavBar },
  sockets: {
    connect: function () {
      console.log('socket connected');
    },
    customEmit: function (val) {
      console.log('Server said me', val);
      this.$socket.emit('say_for_server', {
        massege: 'Hello Server!'
      });
    }
  }
});
