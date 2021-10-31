import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Plot from './components/PlotFunction.vue';
import Title from './components/Title.vue';
import Properties from './components/Properties.vue';
import LinearFunction from './components/LinearFunction.vue';
import QuadraticFunction from './components/QuadraticFunction.vue';

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {path: '/plot', component: Plot},
    {path: '/', component: Title},
    {path: '/properties', component: Properties},
    {path: '/linearFunction', component: LinearFunction},
    {path: '/quadraticFunction', component: QuadraticFunction}
  ]
})

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
