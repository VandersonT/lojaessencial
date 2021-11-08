<template>
  <div id="app">
    <mainHeader></mainHeader>
    <router-view></router-view>
  </div>
</template>

<script>
  import mainHeader from './components/menu.vue'

  export default {
    name: 'App',
    components: {
      mainHeader
    },
    data(){
      return{
        
      }
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
