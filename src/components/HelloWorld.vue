<template>
  <div class="hello">
    <h1 class = 'PageName'>{{ msg }}</h1>

    <div id="rectangle" class="mainControls">

      <label for="fnName" class="CharacteristicsOfTheText1">
       <div class="choosingLetters1">
        <select id = "LetterForFunction" v-model="funcSymbol">
          <option v-for="s in funcSymbols" :key="s">{{ s }}</option>
        </select>
      </div> </label>

      <input v-model="functionName" id="fnName" class="EnteringValues1">

      <label for="maxX" class="CharacteristicsOfTheText2">Max X =
        <div id="v-model-checkbox1" class="PI">
        <input type="checkbox" id="checkbox1" v-model="PIx" />
        <label for="checkbox1">{{ "×" + "\u03C0" }}</label>

          <div id="v-model-checkbox3" class="ef">
          <input type="checkbox" id="checkbox3" v-model="ef" />
            <label for="checkbox1">{{ "×" + "80" }}</label></div>

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

      <div id="calculator">
        <div class="keys">
          <div v-for="predefinedFunction in funcOperators"
               v-html="predefinedFunction.display"
               :key="predefinedFunction.id"
               v-on:click="onPredefinedFunctionClick(predefinedFunction)"></div>
        <div>
          <div class="choosing1">
            <select>
              <option>sin(x)</option>
              <option>cos(x)</option>
              <option>tg(x)</option>
              <option>ctg(x)</option>
              <option>arcsin(x)</option>
              <option>arccos(x)</option>
              <option>arctg(x)</option>
              <option>arcctg(x)</option>
            </select>

            <div class="choosing2">
              <select>
                <option>&#960;</option>
                <option>&#949;</option>
              </select>
              </div>
          </div>
        </div>
          <div v-on:click="eraser(functionName)" class = 'C'>Eraser</div>
        </div>
      </div>


      <button v-on:click="addFunction" class="Butt2">Add Function</button>
      <button v-on:click="drawRect" class="Butt1">Draw functions</button>
    </div>

    <canvas id="canvas" width="600" height="600" class="mainCanvas"></canvas>
    <div id="rectangle2" class="FunctionList">
      <div v-for="fn in fns" :key="fn.id">
        <label :for="fn.id" class="CharacteristicsOfTheText1"></label>

        <ul class="ListFunctionСharacteristic">
        <li :style='{"border-left-color": fn.color, "border-right-color": fn.color}'>
          {{ fn.symbol }} = {{ fn.fn }}
        </li>
          <button v-on:click="deleteFn(fn.id)" class = "Butt3">&#10060;</button>
        </ul>
      </div>
    </div>

  </div>



</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

class FunctionDefinition {
  constructor(id: number, fn: string, color: string, symbol: string) {
    this.id = id
    this.fn = fn
    this.color = color
    this.symbol = symbol
  }
  public id: number
  public fn: string
  public color: string
  public symbol: string
}

class Point {
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
  public x: number;
  public y: number;
}

enum Compose {
  NONE,
  DIRECT,
  REVERSE
}

class PredefinedFunction {
  constructor(id: number, display: string, text: string, compose: Compose) {
    this.id = id
    this.display = display
    this.text = text
    this.compose = compose
  }
  public id: number;
  public display: string;
  public text: string;
  public compose: Compose;
}

function Log(n: number, x: number) {
  return Math.log(x) / Math.log(n);
}
function ABS(x: number) {
  return Math.abs(x)
}
function degToRad (deg: number)
{
  return (Math.PI * deg) / 180;
}
function  Root2 (x: number, n: number, m: number) {
  if (x > 0) {
    return Math.pow(x, (m/n))
  }
   return -1 * Math.pow(-x,(m/n))
}
function  Root1 (x: number, n: number, m: number) {
  if (x > 0) {
    return Math.pow(x, (m/n))
  }
}
function EF(N: number, x: number) {
  return N ** x
}

@Component
export default class HelloWorld extends Vue {
  vueCanvas!: object
  msg = 'Plotting the function'
  maxX = 4
  maxY = 4
  functionName = "Math.tan(x)"
  functionColor = "#29a0a4"
  PIx = false
  PIy = false
  ef = false
  fns: FunctionDefinition[] = [
    //new FunctionDefinition(1, "Math.sin(x)", "#29a0a4")
  ]
  funcSymbol = "ƒ(x)"
  funcSymbols = ["ƒ(x)", "α(x)", "β(x)", "γ(x)", "ζ(x)", "ϑ(x)", "ϰ(x)", "φ(x)", " χ(x)", "ψ(x)", "ω(x)", "ϱ(x)"]
  nextId = 1
  funcOperators = [
    new PredefinedFunction(1, "<span>x<sup>m/n</sup></span>", "x**(m/n)", Compose.NONE),
    new PredefinedFunction(2, "<span>log<sub>n</sub>x</span>", "Log(n,x)", Compose.NONE),
    new PredefinedFunction(3, "<span><sup>2n</sup>&#8730;x<sup>m</sup></span>", "Root1(x, n, m)", Compose.NONE),
    new PredefinedFunction(4, "<span><sup>2n+1</sup>&#8730;x<sup>m</sup></span>", "Root2(x, n, m)", Compose.NONE),
    new PredefinedFunction(5, "<span>(&#925;)<sup>x</sup></span>", "EF(N, x)", Compose.NONE),
    new PredefinedFunction(6, "<span>|x|</span>", "ABS(x)", Compose.NONE),

    new PredefinedFunction(7, "<span>sign(x)</span>", "SIGN(x)", Compose.NONE),

    new PredefinedFunction(8, "<span><sup>1</sup>/<sub>&#402;(x)</sub></span>", "1/ƒ(x)", Compose.DIRECT),
    new PredefinedFunction(9, "<span>&#402;(<sup>1</sup>/<sub>x</sub>)</span>", "1/x", Compose.REVERSE)
  ]


  mounted(): void {
    this.vueCanvas = document
        .getElementById("canvas")
        .getContext("2d");
  }

  addFunction() {
    const idnextId = this.nextId++;
    if (idnextId < 14){
      this.fns.push(new FunctionDefinition(idnextId, this.functionName, this.functionColor, this.funcSymbol))
    }
  }

  deleteFn(id: number) {
    const index = this.fns.findIndex(fd => fd.id == id)
    if (index >= 0) {
      this.fns.splice(index, 1)
    }
  }

  eraser() {
    this.functionName = ''
  }

  onPredefinedFunctionClick(fn: PredefinedFunction) {
    console.info(fn)
    switch (fn.compose) {
      case Compose.NONE:
        this.functionName = fn.text
        break
      case Compose.DIRECT:
        this.functionName = fn.text.replace("ƒ(x)", "(" + this.functionName + ")")
        break
      case Compose.REVERSE:
        this.functionName = this.functionName.replace(/(?!\w)*x(?!\w)*/g, "(" + fn.text + ")")
        break
    }
  }

  drawRect() {
    const ctx = this.vueCanvas;

    const canvasWidth = 600;
    const marginX = 10;
    const canvasHeight = 600;
    const marginY = 10;


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

    const IntersectionOfLinesY = function (a: Point, b: Point): void{

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
      else if (b.y < -maxY && a.y > -maxY && a.y < maxY) {
        moveTo(a.x,a.y);
        lineTo((-maxY - a.y)*(a.x - b.x) / (a.y - b.y) + a.x, -maxY)
      }
      else if ( a.y < -maxY && b.y > -maxY && b.y < maxY) {
        moveTo(b.x,b.y);
        lineTo((-maxY - b.y)*(b.x - a.x) / (b.y - a.y) + b.x, -maxY)
      }
    }

    const IntersectionOfLinesX = function (a: Point, b: Point): void{
      if (b.x < maxX && b.x > -maxX && a.x < maxX && a.x > -maxX)
      {
        IntersectionOfLinesY(new Point(a.x, a.y), new Point(b.x,b.y))
      }
      else if (b.x > maxX && a.x < maxX && a.x > -maxX){
        IntersectionOfLinesY(new Point(a.x, a.y), new Point(maxX, (maxX - b.x) * (a.y - b.y) / (a.x - b.x) + b.y))
      }
      else if (a.x > maxX && b.x < maxX && b.x > -maxX) {
        IntersectionOfLinesY(new Point(b.x,b.y), new Point(maxX, (maxX - a.x) * (b.y - a.y) / (b.x - a.x) + a.y))
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

      if (this.PIx) {
        moveTo(-maxX,fn(-maxX));
        for (x = -maxX; x < maxX; x = x + 1/maxX)
        {
          y = fn(x);
          console.info('x = ' + x + ', y = ' + y);
          IntersectionOfLinesY(new Point(x, y), new Point(x+1/maxX, fn(x+1/maxX)))

        }
        ctx.stroke();
      }
      else if (this.ef) {
        const stepFunction = maxX * 80
        moveTo(-stepFunction,fn(-stepFunction));
        for (x = -stepFunction; x < stepFunction; x = x+ 1/stepFunction)
        {
          y = fn(x);
          console.info('x = ' + x + ', y = ' + y);
          IntersectionOfLinesX(new Point(x, y), new Point(x+1/stepFunction, fn(x+1/stepFunction)))

        }
        ctx.stroke();
      }
      else {
        const stepFunction = maxX * 10
        moveTo(-stepFunction,fn(-stepFunction));
        for (x = -stepFunction; x < stepFunction; x = x+ 1/stepFunction)
        {
          y = fn(x);
          console.info('x = ' + x + ', y = ' + y);
          IntersectionOfLinesX(new Point(x, y), new Point(x+1/stepFunction, fn(x+1/stepFunction)))

        }
        ctx.stroke();
      }


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
.PageName {
  font-family: Luminari, fantasy;
}

.mainControls {
  width: 300px;
  height: 580px;
  background-color: #89c7d2;
  border-radius: 2px;
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
  border-radius: 2px;
  border: 4px double #364a52;
  float: right;
  display: inline;
  position: relative;
  text-align: left;
  font-family: cursive;
}

.CharacteristicsOfTheText1{
  position: absolute;
  display: table-caption;
  margin: 5% 6%;
  font-size: 17px;
  letter-spacing: 2px;
}
.CharacteristicsOfTheText2{
  margin: 24% 2%;
  position: absolute;
  display: table-caption;
  font-size: 17px;
  letter-spacing: 2px;
}
.CharacteristicsOfTheText3{
  width: 80px;
  margin: 24% 52%;
  position: absolute;
  display: table-caption;
  font-size: 17px;
  letter-spacing: 2px;
}

.CharacteristicsOfTheText4{
  margin: 48% 2%;
  position: absolute;
  display: table-caption;
  font-size: 17px;
  letter-spacing: 2px;
}

.EnteringValues1 {
  float: right;
  width: 170px;
  border-radius: 40px;
  margin: 7% 2%; /* сверху | справа | снизу | слева */
}
.EnteringValues1:hover {
  -webkit-box-shadow: 0px 0px 20px rgba(255,255,255,0.8);
  -moz-box-shadow: 0px 0px 20px rgba(255,255,255,0.8);
  box-shadow: 0px 0px 20px rgba(255,255,255,0.8);
}

.EnteringValues2 {
  width: 50px;
  margin: 4% 52%;
  float: right;
  border-radius: 40px;
}
.EnteringValues2:hover {
  -webkit-box-shadow: 0px 0px 20px rgba(255,255,255,0.8);
  -moz-box-shadow: 0px 0px 20px rgba(255,255,255,0.8);
  box-shadow: 0px 0px 20px rgba(255,255,255,0.8);
}

.EnteringValues3 {
  width: 50px;
  margin: -11% 2%;
  float: right;
  border-radius: 40px;
}
.EnteringValues3:hover {
  -webkit-box-shadow: 0px 0px 20px rgba(255,255,255,0.8);
  -moz-box-shadow: 0px 0px 20px rgba(255,255,255,0.8);
  box-shadow: 0px 0px 20px rgba(255,255,255,0.8);
}

.EnteringValues4 {
  width: 120px;
  height: 20px;
  margin: 13% 2%;
  float: right;
  border-radius: 40px;
}
.EnteringValues4:hover {
  -webkit-box-shadow: 0px 0px 20px rgba(255,255,255,0.8);
  -moz-box-shadow: 0px 0px 20px rgba(255,255,255,0.8);
  box-shadow: 0px 0px 20px rgba(255,255,255,0.8);
}
.mainCanvas {
  width: 600px;
  height: 600px;
  margin-left: auto;
  margin-right: auto;
  display: inline;
}


.Butt1 {
  font-family: cursive;
  float: right;
  margin: 8% -4%; /* сверху | справа | снизу | слева */
  position: absolute;
  right: 10%;
  display:block;
  color: #244950;
  text-decoration: none;
  border-color: #7eb2b4;
}
.Butt1:visited {
  color: #68b1bf;
}
.Butt1:hover {
  color: #2b3c62;
  box-shadow: inset 0 0 0 23px #6cd0d4;
}

.Butt2 {
  font-family: cursive;
  float: right;
  position: absolute;
  margin: 8% -4%; /* сверху | справа | снизу | слева */
  left: 10%;
  display:block;
  color: #244950;
  text-decoration: none;
  border-color: #7eb2b4;
}
.Butt2:visited {
  color: #68b1bf;
}
.Butt2:hover {
  color: #2b3c62;
  box-shadow: inset 0 0 0 23px #6cd0d4;
}
.Butt3 {
  float: right;
  margin-top: -11.5%;
  margin-right: 7%;
}
.Butt3:visited {
  color: #68b1bf;
}
.Butt3:hover {
  color: #2b3c62;
  box-shadow: inset 0 0 0 23px #6cd0d4;
}

.PI {
  font-family: cursive;
  font-size: 20px;
  width: 50px;
  height: 30px;
  border-radius: 2px;
  border: 4px double #459295;
  margin: 5% 2%;
}

.ef {
  font-family: "Times New Roman";
  font-size: 20px;
  width: 70px;
  height: 30px;
  border-radius: 2px;
  border: 4px double #459295;
  margin: -65% 100%;
}

.ListFunctionСharacteristic {
  list-style: none;
  padding: 0;
}
.ListFunctionСharacteristic li {
  width: 230px;
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
  font-size: 17px;
  letter-spacing: 2px;
}
.ListFunctionСharacteristic li:hover {border-left: 10px solid transparent;}

#calculator {
  width: 290px;
  height: 313px;
  margin-top: 188px;
  margin-left: auto;
  margin-right: auto;
  background: #9dd2ea;
  background: linear-gradient(#9dd2ea, #8bceec);
  border-radius: 3px;
  box-shadow: 0px 4px #009de4, 0px 10px 15px rgba(0, 0, 0, 0.2);
}

.choosingLetters1 select {
  background: transparent;
  width: 90px;
  border-radius: 20px;
  padding: 5px;
  border: 4px double #1c4b5c;
  height: 38px;
  position: relative;
  display: table-caption;
  margin: -8% -8%;
  font-size: 17px;
  letter-spacing: 2px;
}

.choosing1 select {
  background: transparent;
  width: 115px;
  height: 45px;
  border-radius: 20px;
  padding: 5px;
  border: 4px double #70d2ff;
  position: relative;
  display: table-caption;
  font-size: 17px;
  font-family: cursive;
  margin: 38px 5%; /* сверху | справа | снизу | слева */
}

.choosing2 select {
  background: transparent;
  width: 85px;
  height: 45px;
  border-radius: 20px;
  padding: 5px;
  border: 4px double #70d2ff;
  position: relative;
  display: table-caption;
  font-size: 17px;
  font-family: cursive;
  margin: -72px 60%; /* сверху | справа | снизу | слева */
  top: -71px;
}

.C {
  margin: -17% 5%;
  width: 50px;
  height: 25px;
  padding: 5px;
  border: 4px double #70d2ff;
  position: relative;
  font-size: 17px;
  font-family: cursive;
}

.C:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 36px;
  background: rgba(172, 243, 273, 0.3);
  border-radius: 5px;
  transition: all 2s ease;
}

.C:hover:before {
  width: 100%;
}

.keys span{
  float: left;
  position: relative;
  top: 20px;
  right: -15px;
  cursor: pointer;
  width: 76px;
  height: 36px;
  line-height: 27px;
  text-align: center;
  user-select: none;
  transition: all 0.2s ease;
  font-size: 17px;
  letter-spacing: 2px;
}

.keys{
  background: #4097bf;
  height:260px;
  width: 240px;
  margin: 10px 25px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 1),
  -23px 0 20px -23px rgba(0, 0, 0, .8),
  23px 0 20px -23px rgba(0, 0, 0, .8),
  0 0 40px rgba(0, 0, 0, .1) inset;
  word-spacing: 60px;
}

.keys span:hover {
  background: #5fc9f0;
  box-shadow: 2px 4px #206883;
  color: black;
  position: relative;
}

.keys span:active {
  box-shadow: 0px 0px #3348b1;
  top: 4px;
}


</style>