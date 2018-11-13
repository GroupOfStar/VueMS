<template>
  <div id="app">
      <!-- for example router view -->
      <router-view></router-view>
      <!-- set progressbar -->
      <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
html, body, #app, .login {
  height: 100%;
  margin: 0px;
}
</style>
