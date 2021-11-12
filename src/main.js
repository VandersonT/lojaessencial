import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import home from './views/home.vue'
import login from './views/login.vue'
import register from './views/register.vue'
import productWanted from './views/productWanted.vue'
import productSingle from './views/productSingle.vue'
import favorites from './views/favorites.vue'
import kart from './views/kart.vue'
import profile from './views/profile.vue'
import settings from './views/settings.vue'

Vue.use(VueRouter);

const router = new VueRouter({
  routes:[
    {path: '/', component:home},
    {path: '/login', component:login},
    {path: '/cadastro', component:register},
    {path: '/produtos', component:productWanted},
    {path: '/produto/:id', component:productSingle},
    {path: '/favoritos', component:favorites},
    {path: '/carrinho', component:kart},
    {path: '/perfil', component:profile},
    {path: '/configuracao', component:settings}
  ]
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
