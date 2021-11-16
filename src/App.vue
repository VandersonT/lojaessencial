<template>
  <div id="app">
    <mainHeader></mainHeader>
    <router-view :key="$route.path"></router-view>
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

  .animate__fadeIn{
    animation-duration: 2s;
  }

  .link{
      color: rgb(0, 119, 255);
      margin-top: 10px;
      cursor: pointer;
  }

  a{
      color: rgb(0, 0, 0);
      text-decoration: none;
  }

  li{
      list-style: none;
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

  .icon{
      border: 0;
      margin-top: 10px;
      padding: 8px 5px;
      border-radius: 5px;
      text-transform: uppercase;
      color: #272727;
      font-size: 20px;
      background: transparent;
      margin-right: 15px;
      cursor: pointer;
  }

  .delete{
      color: rgb(75, 18, 18);
  }
  .save{
    color: rgb(75, 18, 18);
    font-size: 22px;
  }
</style>
