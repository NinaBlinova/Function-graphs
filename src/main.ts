import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import HelloWorld from './components/HelloWorld.vue';
import Title from './components/Title.vue';

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {path: '/', component: HelloWorld},
    {path: '/title', component: Title}
  ]
})

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
