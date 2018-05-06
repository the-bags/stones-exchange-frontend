// URL and endpoint constants
import router from '../router';
import Vue from 'vue';
import VueResource from 'vue-resource';

export default {

  // User object will let us check authentication status
  user: {
    authenticated: localStorage.getItem('authenticated'),
    name: '',
    email: ''
  },

  // Send a request to the login URL and save the returned JWT
  login(credentials, redirect) {
    console.log('==>' + process.env.LOGIN_URL);
    Vue.use(VueResource);
    Vue.http.post(process.env.LOGIN_URL, credentials)
      .then((data) => {
        localStorage.setItem('id_token', data.id_token);
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('authenticated', true);
        console.log('login data =>', data);

        this.user.authenticated = true;
        this.user.name = data.body.user.name;
        this.user.email = data.body.user.email;

        if (redirect) {
          router.push(redirect);
        }
      })
      .catch((err) => {
        err.status === 403 ? router.push('/user/register') : console.error(err);
      });
  },

  register(credentials, redirect) {
    Vue.use(VueResource);
    Vue.http.post(process.env.REGISTER_URL, credentials)
      .then((data) => {
        console.log('data', data);
        localStorage.setItem('id_token', data.id_token);
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('authenticated', true);

        this.user.authenticated = true;
        this.user.name = data.body.user.name;
        this.user.email = data.body.user.email;

        if (redirect) {
          router.push(redirect);
        }
      }).catch((err) => {
        console.error(err);
      });
  },

  // To log out, we just need to remove the token
  logout(redirect) {
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('authenticated');
    this.user.authenticated = false;
    this.user.name = '';
    this.user.email = '';
    if (redirect) {
      router.push(redirect);
    }
  },

  isAuthorized() {
    return localStorage.getItem('authenticated');
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    };
  }
};
