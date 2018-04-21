<template>
  <div class="row">
    <div class="col-md-4 offset-4">
      <div class="card">
        <div class="card-header">
          <h2 class="text-center">Register</h2>
        </div>
        <div class="card-body">
          <form @submit.prevent="submit">
            <div class="form-group">
              <label for="userName">Name</label>
              <input type="text" class="form-control" id="userName" placeholder="Name"
                     v-model="registerData.name" required>
            </div>
            <div class="form-group">
              <label for="userEmail">Email address</label>
              <input type="email" class="form-control" id="userEmail" aria-describedby="emailHelp"
                     placeholder="Enter email" v-model="registerData.email" required>
            </div>
            <div class="form-group">
              <label for="userPassword">Password</label>
              <input type="password" class="form-control" id="userPassword" placeholder="Password"
                     v-model="registerData.password" required>
              <label for="userPasswordConfirmation">Confirm password</label>
              <input type="password" class="form-control" id="userPasswordConfirmation" placeholder="Confirm password"
                     v-model="passwordConfirmation" required>
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
    name: 'register',
    data: () => {
      return {
        backendUrl: 'http://localhost:3001',
        registerData: {
          name: '',
          email: '',
          password: ''
        },
        passwordConfirmation: ''
      };
    },
    methods: {
      submit() {
        if (this.registerData.password === this.passwordConfirmation) {
          auth.register(this, this.registerData, '/');
        } else {
          // TODO add password & password confirmation mismatch handling
        }
      }
    }
  };
</script>

<style>
  .card {
    margin-top: 2rem;
  }
</style>
