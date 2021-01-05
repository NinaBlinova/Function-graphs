<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button v-on:click="drawRect">Test</button>
    <canvas id="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() msg!: string
  vueCanvas!: object

  mounted(): void {
    const canvasElement = document.getElementById("canvas");
    this.vueCanvas = canvasElement.getContext("2d");
  }

  drawRect() {
    this.vueCanvas.clearRect(0, 0, 400, 200);

    this.vueCanvas.beginPath();
    this.vueCanvas.rect(20, 20, 100, 100);
    this.vueCanvas.stroke();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
