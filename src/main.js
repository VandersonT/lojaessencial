import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import home from './views/home.vue'

Vue.use(VueRouter);

const router = new VueRouter({
  routes:[
    {path: '/', component:home}
  ]
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
