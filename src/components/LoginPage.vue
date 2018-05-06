<template>
  <div class="row">
    <div class="col-md-4 offset-4">
      <div class="card">
        <div class="card-header">
          <h2 class="text-center">Login</h2>
        </div>
        <div class="card-body">
          <form @submit.prevent="submit">
            <div class="form-group">
              <label for="userEmail">Email address</label>
              <input type="email" class="form-control" id="userEmail" aria-describedby="emailHelp"
                     placeholder="Enter email" v-model="credentials.email" required>
            </div>
            <div class="form-group">
              <label for="userPassword">Password</label>
              <input type="password" class="form-control" id="userPassword" placeholder="Password"
                     v-model="credentials.password" required>
            </div>
            <div class="text-right">
              <button type="submit" class="btn btn-primary" id="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import auth from '../auth';
  export default {
    name: 'LoginPage',
    data: () => {
      return {
        backendUrl: process.env.API_URL,
        credentials: {
          email: '',
          password: ''
        }
      };
    },
    methods: {
      submit() {
        auth.login(this.credentials, '/');
      }
    }
  };
</script>

<style scoped>
  .card {
    margin-top: 2rem;
  }
</style>
