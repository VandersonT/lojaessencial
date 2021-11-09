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
      padding: 0;
      margin: 0;
      box-sizing: border-box;
  }

  .animate__bounceInRight{
    animation-duration: 0.5s;
  }

  .link{
      color: rgb(0, 119, 255);
      margin-top: 10px;
  }

  a{
      color: rgb(0, 0, 0);
      text-decoration: none;
  }

  li{
      list-style: none;
  }

  html {
      scroll-behavior: smooth;
  }

  /*-----------------SCROLL-BAR---------------*/
  ::-webkit-scrollbar{
      width: 10px;
      height: 10px;
  }

  ::-webkit-scrollbar-track{
      background-color: rgb(165, 165, 165);
  }

  ::-webkit-scrollbar-button{
      display: none;
  }
  ::-webkit-scrollbar-thumb{
      background-color: rgb(61, 61, 61);
      border-radius: 5px;
  }
  /*------------------------------------------*/
</style>
