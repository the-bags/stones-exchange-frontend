<template>
  <div class="row">
  <div class="col-md-4 offset-4">
  <div class="card">
    <div class="card-header">
      <h2 class="text-center">Register</h2>
    </div>
    <div class="card-body">
      <form>
        <div class="form-group">
          <label for="userFirstName">First Name</label>
          <input type="text" class="form-control" id="userFirstName" placeholder="First name">
          <label for="userLastName">Last name</label>
          <input type="text" class="form-control" id="userLastName" placeholder="Last name">
        </div>
        <div class="form-group">
          <label for="userEmail">Email address</label>
          <input type="email" class="form-control" id="userEmail" aria-describedby="emailHelp" placeholder="Enter email">
        </div>
        <div class="form-group">
          <label for="userPassword">Password</label>
          <input type="password" class="form-control" id="userPassword" placeholder="Password">
          <label for="userPasswordConfirmation">Confirm password</label>
          <input type="password" class="form-control" id="userPasswordConfirmation" placeholder="Confirm password">
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
export default {
  name: 'register'
};
</script>

<style>
  .card {
    margin-top: 2rem;
  }
</style>
