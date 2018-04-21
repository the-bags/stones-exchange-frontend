
// URL and endpoint constants
const API_URL = 'http://localhost:3001/';
const LOGIN_URL = API_URL + 'login';
const REGISTER_URL = API_URL + 'register';

export default {

  // User object will let us check authentication status
  user: {
    authenticated: false
  },

  // Send a request to the login URL and save the returned JWT
  login(context, credentials, redirect) {
    context.$http.post(LOGIN_URL, credentials)
      .then((data) => {
        console.log('data', data);
        localStorage.setItem('id_token', data.id_token);
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('authenticated', true);

        this.user.authenticated = true;

        if (redirect) {
          context.$router.push(redirect);
        }
      })
      .catch((err) => {
        err.status === 403 ? context.$router.push('/user/register') : console.error(err);
      });
  },

  register(context, credentials, redirect) {
    context.$http.post(REGISTER_URL, credentials)
      .then((data) => {
        console.log('data', data);
        localStorage.setItem('id_token', data.id_token);
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('authenticated', true);

        this.user.authenticated = true;

        if (redirect) {
          context.$router.push(redirect);
        }
      }).catch((err) => {
        console.error(err);
      });
  },

  // To log out, we just need to remove the token
  logout(context, redirect) {
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('authenticated');
    this.user.authenticated = false;
    if (redirect) {
      context.$router.push(redirect);
    }
  },

  isAuthorized() {
    // let jwt = localStorage.getItem('id_token');
    let jwt = localStorage.getItem('authenticated');
    console.log('jwt' + jwt);
    if (jwt) {
      this.user.authenticated = true;
    } else {
      this.user.authenticated = false;
    }
    return this.user.authenticated;
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    };
  }
};
