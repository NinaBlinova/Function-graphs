<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div id="rectangle" class="mainControls">
      <button v-on:click="drawRect">Function</button>
      <label for="maxX">Max X (* pi)</label><input v-model="maxX" id="maxX" type="number">
      <label for="maxY">Max Y</label><input v-model="maxY" id="maxY" type="number">
      <label for="fn">Max Y</label><input v-model="fn" id="fn">
    </div>
    <canvas id="canvas" width="600" height="600" class="mainCanvas"></canvas>
  </div>

</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class HelloWorld extends Vue {
  vueCanvas!: object
  msg = 'Chart 3D'
  maxX = 2
  maxY = 1
  fn = "Math.sin(x)"

  mounted(): void {
    this.vueCanvas = document
        .getElementById("canvas")
        .getContext("2d");
  }

  drawRect() {
    const ctx = this.vueCanvas;

    const canvasWidth = 600;
    const marginX = 10;
    const canvasHeight = 600;
    const marginY = 10;

    const fnDef = this.fn
    const fn = function (x: number) {
      return eval(fnDef)
    }

    const maxX = this.maxX * Math.PI;
    const convertWidth = function (width: number): number {
      const aX = (canvasWidth - 2 * marginX) / (2 * maxX);
      return width * aX;
    }
    const convertX = function (x: number): number {
      const bX = canvasWidth / 2;
      return convertWidth(x) + bX
    }

    const maxY = this.maxY;
    const convertHeight = function (height: number): number {
      const aY = (canvasHeight - 2 * marginY) / (2 * maxY);
      return height * aY;
    }
    const convertY = function (y: number): number {
      const bY = canvasHeight / 2;
      return -convertHeight(y) + bY
    }


    const rect = function (x: number, y: number, width: number, height: number): void {
      ctx.rect(convertX(x), convertY(y), convertWidth(width), convertHeight(height));
    }
    const moveTo = function (x: number, y: number): void {
      ctx.moveTo(convertX(x), convertY(y));
    }
    const lineTo = function (x: number, y: number): void {
      ctx.lineTo(convertX(x), convertY(y));
    }
    const fillText = function (str: string, x: number, y: number): void {
      ctx.fillText(str, convertX(x), convertY(y));
    }
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.beginPath();
    rect(-maxX, maxY, 2 * maxX, 2 * maxY);
    ctx.strokeStyle = '#22695c';
    ctx.lineWidth = 2;

    //ось ОХ
    moveTo(maxX, 0);
    lineTo(-maxX, 0);

    //ось ОУ
    moveTo(0, maxY);
    lineTo(0, -maxY);


    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 1;
    //Цикл для рисования сетки по ОХ
    for (let x1 = -maxX; x1 < maxX; x1 = x1 + Math.PI) {
      moveTo(x1, -maxY);
      lineTo(x1, maxY);
    }

    //Цикл для рисования сетки по ОY
    for (let y1 = -maxY; y1 < maxY; y1++) {
      moveTo(-maxX, y1);
      lineTo(maxX, y1);
    }

    ctx.stroke();

    //график
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#29a0a4';
    moveTo(-maxX,0);
    let x = 0;
    let y = 0;
    for (x = -maxX; x <= maxX; x = x+1/maxX)
    {
      y = fn(x);
      lineTo(x,y);
    }
    ctx.stroke();

    //название осей
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#08191c";
    ctx.font = '10px cursive';
    for (let i = -2*maxX; i < maxX; i = i + Math.PI/2) {
      moveTo(i, maxY/10);
      lineTo(i , -maxY/10);
      fillText(i.toFixed(2) + '', i, -maxY/8);
    }
    for (let i=-2*maxY; i <  maxY; i = i + 0.5) {
      moveTo(maxX/10, i);
      lineTo(-maxX/10, i);
      fillText(i+'', maxX/8, i);
    }
    ctx.stroke();
  }
}
</script>

<style>
.mainControls {
  width: 300px;
  height: 600px;
  background-color: #89c7d2;
  border-radius: 80px;
  float: left;
  display: inline;
}

.mainCanvas {
  width: 600px;
  height: 600px;
  float: left;
  display: inline;
}
</style>


