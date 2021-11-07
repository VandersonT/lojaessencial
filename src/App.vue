<template>
  <div id="app">
    <loggedoutHeader></loggedoutHeader>
    <router-view></router-view>
  </div>
</template>

<script>
  import loggedoutHeader from './components/menu.vue'

  export default {
    name: 'App',
    components: {
      loggedoutHeader
    }
  }
</script>

<style>
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
</style>
