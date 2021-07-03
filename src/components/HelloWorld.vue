<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div id="rectangle" class="mainControls">

      <label for="fnName" class="CharacteristicsOfTheText1">F(X) = </label>
      <input v-model="functionName" id="fnName" class="EnteringValues1">

      <label for="maxX" class="CharacteristicsOfTheText2">Max X =
        <div id="v-model-checkbox1" class="PI">
        <input type="checkbox" id="checkbox1" v-model="PIx" />
        <label for="checkbox1">{{ "×" + "\u03C0" }}</label>
      </div></label>
      <input v-model="maxX" id="maxX" type="number" class="EnteringValues2">

      <label for="maxY" class="CharacteristicsOfTheText3">Max Y =
        <div id="v-model-checkbox2" class="PI">
          <input type="checkbox" id="checkbox2" v-model="PIy" />
          <label for="checkbox2">{{ "×" + "\u03C0" }}</label>
        </div></label>
      <input v-model="maxY" id="maxY" type="number" class="EnteringValues3">

      <label for="functionColor" class = "CharacteristicsOfTheText4">Function Color:</label>
      <input v-model="functionColor" id="functionColor" type="color" class="EnteringValues4">

      <button v-on:click="addFunction" class="Butt2">Add Function</button>
      <button v-on:click="drawRect" class="Butt1">Draw functions</button>

    </div>
    <canvas id="canvas" width="600" height="600" class="mainCanvas"></canvas>
    <div id="rectangle2" class="FunctionList">
      <div v-for="fn in fns" :key="fn.id">
        <label :for="fn.id" class="CharacteristicsOfTheText1"></label>

        <ul class="ListFunctionСharacteristic" >
        <li :style='{"border-left-color": fn.color}'>{{ fn.fn }}</li>
        </ul>

      </div>
    </div>
  </div>



</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

class FunctionDefinition {
  constructor(id: number, fn: string, color: string) {
    this.id = id
    this.fn = fn
    this.color = color
  }
  public id: number
  public fn: string
  public color: string
}

class Point {
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
  public x: number;
  public y: number;
}

@Component
export default class HelloWorld extends Vue {
  vueCanvas!: object
  msg = 'Chart 3D'
  maxX = 4
  maxY = 4
  functionName = "Math.cos(x)"
  functionColor = "#29a0a4"
  PIx = false
  PIy = false
  fns: FunctionDefinition[] = [
    //new FunctionDefinition(1, "Math.sin(x)", "#29a0a4")
  ]


  mounted(): void {
    this.vueCanvas = document
        .getElementById("canvas")
        .getContext("2d");
  }

  addFunction() {
    const idnextId = this.fns.length + 1;
    this.fns.push(new FunctionDefinition(idnextId, this.functionName, this.functionColor))
  }

  drawRect() {
    const ctx = this.vueCanvas;

    const canvasWidth = 600;
    const marginX = 10;
    const canvasHeight = 600;
    const marginY = 10;
    const cloneLimit = 14;

    let maxX = this.maxX
    if (this.PIx){
       maxX = this.maxX * Math.PI;
    }
    const convertWidth = function (width: number): number {
      const aX = (canvasWidth - 2 * marginX) / (2 * maxX);
      return width * aX;
    }
    const convertX = function (x: number): number {
      const bX = canvasWidth / 2;
      return convertWidth(x) + bX
    }
    let maxY = this.maxY
    if (this.PIy){
      maxY = this.maxY * Math.PI;
    }
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

    const IntersectionOfLines = function (a: Point, b: Point): void{
      if (b.y < maxY && b.y > -maxY && a.y < maxY && a.y > -maxY)
      {
        moveTo(a.x,a.y);
        lineTo(b.x,b.y);
      }
      else if (b.y > maxY && a.y < maxY && a.y > -maxY) // 1 and 2 fourth
      {
        moveTo(a.x,a.y);
        lineTo((maxY - a.y)*(a.x - b.x) / (a.y - b.y) + a.x, maxY)
      }
      else if (b.y < maxY && a.y > maxY && b.y > -maxY) {
        moveTo(b.x,b.y);
        lineTo((maxY - b.y)*(b.x - a.x) / (b.y - a.y) + b.x, maxY)
      }
      else if (b.y < -maxY && a.y > -maxY && a.y < maxY) { // 3 and 3 fourth
        moveTo(a.x,a.y);
        lineTo((-maxY - a.y)*(a.x - b.x) / (a.y - b.y) + a.x, -maxY)
      }
      else if ( a.y < -maxY && b.y > -maxY && b.y < maxY) { // 3 and 3 fourth
        moveTo(b.x,b.y);
        lineTo((-maxY - b.y)*(b.x - a.x) / (b.y - a.y) + b.x, -maxY)
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
    let unitSegmentX = 1;
    if (this.PIx) {
      unitSegmentX = Math.PI;
    }
    //Цикл для рисования сетки по ОХ
    for (let x1 = -maxX; x1 < maxX; x1 = x1 + unitSegmentX) {
      moveTo(x1, -maxY);
      lineTo(x1, maxY);
    }

    let unitSegmentY = 1;
    if (this.PIy) {
      unitSegmentY = Math.PI;
    }
    //Цикл для рисования сетки по ОY
    for (let y1 = -maxY; y1 < maxY; y1 = y1 + unitSegmentY) {
      moveTo(-maxX, y1);
      lineTo(maxX, y1);
    }
    ctx.stroke();

    this.fns.forEach(fnDef => {
      const fn = function (x: number) {
        return eval(fnDef.fn)
      }
      //график
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = fnDef.color;
      let x = 0;
      let y = 0;

      moveTo(-maxX,fn(-maxX));
      for (x = -maxX; x < maxX; x = x+1/maxX)
      {
        y = fn(x);
        console.info('y = ');
        IntersectionOfLines(new Point(x, y), new Point(x+1/maxX, fn(x+1/maxX)))

      }
      ctx.stroke();
    })

    //название осей

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#08191c";
    ctx.font = '10px Courier New, monospace';

    let unitSegmentXforTextX = 1;
    if (this.PIx) {
      unitSegmentXforTextX = Math.PI;
    }
    for (let i = -2*maxX; i < maxX; i = i + unitSegmentXforTextX) {
      moveTo(i, maxY/20);
      lineTo(i , -maxY/20);
      fillText(i.toFixed(2), i, -maxY/8);
    }

    let unitSegmentXforTextY = 1;
    if (this.PIy) {
      unitSegmentXforTextY = Math.PI;
    }
    for (let i=-2*maxY; i <  maxY; i = i + unitSegmentXforTextY) {
      moveTo(maxX/20, i);
      lineTo(-maxX/20, i);
      fillText(i.toFixed(2), maxX/8, i);
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
  border: 4px double #364a52;
}
.FunctionList {
  width: 300px;
  height: 600px;
  background-color: #89c7d2;
  border-radius: 70px;
  border: 4px double #364a52;
  float: left;
  display: inline;
  position: relative;
  text-align: left;
  font-family: cursive;
}

.CharacteristicsOfTheText1{
  position: absolute;
  display: table-caption;
  margin: 5% 9%;
}
.CharacteristicsOfTheText2{
  margin: 20% 2%;
  position: absolute;
  display: table-caption;
}
.CharacteristicsOfTheText3{
  left: 5px;
  position: absolute;
  top: 144px;
  display: table-caption;
}

.CharacteristicsOfTheText4{
  margin: 77% 2%;
  position: absolute;
  display: table-caption;
}

.EnteringValues1 {
  float: right;
  border-radius: 40px;
  margin: 5% 9%; /* сверху | справа | снизу | слева */
}

.EnteringValues2 {
  margin: 4% 9%;
  float: right;
  border-radius: 40px;
}

.EnteringValues3 {
  margin: 16% 9%;
  float: right;
  border-radius: 40px;
}

.EnteringValues4 {
  width: 120px;
  height: 20px;
  margin: 6% 7%;
  float: right;
  border-radius: 40px;
}

.mainCanvas {
  width: 600px;
  height: 600px;
  float: left;
  display: inline;
}


.Butt1 {
  font-family: cursive;
  float: right;
  position: absolute;
  bottom: -40px;
  right: 10%;
  display:block;
  color: #244950;
  text-decoration: none;
}
.Butt1:visited {
  color: #68b1bf;
}
.Butt1:hover {
  color: #2b3c62;
  box-shadow: inset 0 0 0 23px #5e9fb4;
}

.Butt2 {
  font-family: cursive;
  float: right;
  position: absolute;
  bottom: -40px;
  left: 10%;
  display:block;
  color: #244950;
  text-decoration: none;
}
.Butt2:visited {
  color: #68b1bf;
}
.Butt2:hover {
  color: #2b3c62;
  box-shadow: inset 0 0 0 23px #5e9fb4;
}
.PI {
  font-family: cursive;
  font-size: 20px;
  width: 50px;
  height: 30px;
  border-radius: 2px;
  border: 4px double #364a52;
  margin: 5% 2%;
}

.ListFunctionСharacteristic {
  list-style: none;
  padding: 0;
}
.ListFunctionСharacteristic li {
  width: 130px;
  margin-left: auto;
  margin-right: auto;
  font-family: cursive;
  padding: 1px 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border-left: 10px solid #f05d22;
  box-shadow: 2px -2px 5px 0 rgba(0,0,0,.1),
  -2px -2px 5px 0 rgba(0,0,0,.1),
  2px 2px 5px 0 rgba(0,0,0,.1),
  -2px 2px 5px 0 rgba(0,0,0,.1);
  font-size: 20px;
  letter-spacing: 2px;
  transition: 0.3s all linear;
}
.ListFunctionСharacteristic li:hover {border-left: 10px solid transparent;}
.ListFunctionСharacteristic li:nth-child(1):hover {border-right: 10px solid #f05d22;}


</style>