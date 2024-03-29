import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Plot from './components/PlotFunction.vue';
import Title from './components/Title.vue';
import Properties from './components/Properties.vue';
import LinearFunction from './components/LinearFunction.vue';
import QuadraticFunction from './components/QuadraticFunction.vue';
import Hyperbola from './components/Hyperbola.vue';
import Sinus from './components/Sinus.vue';

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {path: '/plot', component: Plot},
    {path: '/', component: Title},
    {path: '/properties', component: Properties},
    {path: '/linearFunction', component: LinearFunction},
    {path: '/quadraticFunction', component: QuadraticFunction},
    {path: '/hyperbola', component: Hyperbola},
    {path: '/sin', component: Sinus}
  ]
})
//навигация
new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
