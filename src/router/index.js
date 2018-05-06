import Vue from 'vue';
import Router from 'vue-router';
import RegisterPage from '@/components/RegisterPage';
import LoginPage from '@/components/LoginPage';
import Space from '@/components/Space';
import NavBar from '@/components/NavBar';
import Quote from '@/components/Quote';
import Home from '@/components/Home';
import App from '@/components/App';
import UserListPage from '../components/UserListPage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Quote',
      component: Quote
    },
    {
      path: '/space',
      name: 'Space',
      component: Space
    },
    {
      path: '/users',
      name: 'UserList',
      component: UserListPage
    },
    {
      path: '/user/register',
      name: 'RegisterPage',
      component: RegisterPage
    },
    {
      path: '/user/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/test',
      name: 'NavBar',
      component: NavBar
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/app',
      name: 'App',
      component: App
    }
  ]
});
