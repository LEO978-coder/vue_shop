<template>
  <div class="login">
    <login-container />
  </div>
</template>

<script>

  import LoginContainer from './chilrenCopms/LoginContainer.vue'

  export default {
    name: 'Login',
    components: {
      LoginContainer
    },
    data() {
      return {
        
      }
    }
  };
</script>

<style scoped>
  .login {
    height: 100%;
    width: 100%;
    background-color: #2d3a4b;
  }
</style>