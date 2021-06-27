<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div id="rectangle" class="mainControls">

      <label for="fn" class="CharacteristicsOfTheText1">function</label>
      <input v-model="fn" id="fn" class="EnteringValues1">

      <label for="maxX" class="CharacteristicsOfTheText2">Max X (* pi)</label>
      <input v-model="maxX" id="maxX" type="number" class="EnteringValues2">

      <label for="maxY" class="CharacteristicsOfTheText3">Max Y</label>
      <input v-model="maxY" id="maxY" type="number" class="EnteringValues3">

      <button v-on:click="drawRect" class="Butt">Function</button>

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
    const crossing = function (x1: number, y1: number, x2: number, y2: number): number{
      return x2 - marginX*(x2 - x1)/(y2 - y1);
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

    const IntersectionOfLines = function (x1: number, y1: number, x2: number, y2: number): void{
      if (y2 < maxY && y2 > -maxY && y1 < maxY && y1 > -maxY)
      {
        moveTo(x1,y1);
        lineTo(x2,y2);
      }
      else if (y2 > maxY && y1 < maxY && y1 > -maxY) // 1 and 2 fourth
      {
        moveTo(x1,y1);
        lineTo((maxY - y1)*(x1 - x2) / (y1 - y2) + x1, maxY)
      }
      else if (y2 < maxY && y1 > maxY && y2 > -maxY) {
        moveTo(x2,y2);
        lineTo((maxY - y2)*(x2 - x1) / (y2 - y1) + x2, maxY)
      }
      else if (y2 < -maxY && y1 > -maxY && y1 < maxY) { // 3 and 3 fourth
        moveTo(x1,y1);
        lineTo((-maxY - y1)*(x1 - x2) / (y1 - y2) + x1, -maxY)
      }
      else if ( y1 < -maxY && y2 > -maxY && y2 < maxY) { // 3 and 3 fourth
        moveTo(x2,y2);
        lineTo((-maxY - y2)*(x2 - x1) / (y2 - y1) + x2, -maxY)
      }
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
    let x = 0;
    let y = 0;
    moveTo(-maxX,fn(-maxX));
    for (x = -maxX; x < maxX; x = x+1/maxX)
    {
      y = fn(x);
      console.info('y = ');
      IntersectionOfLines(x, y, x+1/maxX, fn(x+1/maxX))

      }
    ctx.stroke();

    //название осей

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#08191c";
    ctx.font = '10px cursive';
    for (let i = -2*maxX; i < maxX; i = i + Math.PI) {
      moveTo(i, maxY/20);
      lineTo(i , -maxY/20);
      fillText(i.toFixed(2), i, -maxY/8);
    }
    for (let i=-2*maxY; i <  maxY; i = i + 1) {
      moveTo(maxX/20, i);
      lineTo(-maxX/20, i);
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
  border-radius: 70px;
  float: left;
  display: inline;
  position: relative;
  text-align: left;
  font-family: cursive;
}

.CharacteristicsOfTheText1{
  left: 5px;
  position: absolute;
  top: 48px;
  display: table-caption;
}
.CharacteristicsOfTheText2{
  left: 5px;
  position: absolute;
  top: 96px;
  display: table-caption;
}
.CharacteristicsOfTheText3{
  left: 5px;
  position: absolute;
  top: 144px;
  display: table-caption;
}

.EnteringValues1 {
  margin-top: 18%;
  float: right;
  border-radius: 40px;
}

.EnteringValues2 {
  margin-top: 8%;
  float: right;
  border-radius: 40px;
}

.EnteringValues3 {
  margin-top: 9%;
  float: right;
  border-radius: 40px;
}

.mainCanvas {
  width: 600px;
  height: 600px;
  float: left;
  display: inline;
}


.Butt {
  font-family: cursive;
  float: right;
  position: absolute;
  bottom: 0px;
  left: 38%;
  display:block;
  color: #244950;
  text-decoration: none;
}
.Butt:visited {
  color: #68b1bf;
}
.Butt:hover {
  color: #2b3c62;
  box-shadow: inset 0 0 0 23px #5e9fb4;
}

</style>