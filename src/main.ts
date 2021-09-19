import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Graph from './components/Graph.vue';
import Title from './components/Title.vue';
import Properties from './components/Properties.vue';

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {path: '/', component: Graph},
    {path: '/title', component: Title},
    {path: '/properties', component: Properties}
  ]
})

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
