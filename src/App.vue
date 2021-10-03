<template>
  <div id="app">

    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Graph from './components/Graph.vue';
import Title from './components/Title.vue'
import Properties from './components/Properties.vue'

@Component({
  components: {
    Graph,
    Title,
    Properties
  }
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  text-decoration: none;
}
</style>
