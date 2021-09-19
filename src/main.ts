import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import HelloWorld from './components/HelloWorld.vue';

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {path: '/', component: HelloWorld}
  ]
})

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
