<template>
  <div>
    userlist:<br><br>
    <p v-for="user in userList"> - {{user.email}}</p>
  </div>
</template>

<script>
  export default {
    name: 'user-list-page',
    data () {
      return {
        userList: []
      };
    },
    created () {
      this.getUserList();
    },
    methods: {
      getUserList () {
        this.$http.get(process.env.API_URL + 'user').then(list => {
          this.userList = list.data;
        });
      }
    }
  };
</script>

<style scoped>

</style>
