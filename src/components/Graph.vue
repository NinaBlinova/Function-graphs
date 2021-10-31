<template>
  <div class="hello">
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
            <div class="choosing1" >
              <select v-model="selectedDisplayShapeText" v-on:change="onPredefinedFunctionClickTrig($event)">
                <option v-for="predefinedFunctionTrigonometry in funcOperatorsTrigonometry"
                        v-html="predefinedFunctionTrigonometry.display"
                        :key="predefinedFunctionTrigonometry.id">
                </option>
              </select>
            </div>
          </div>

          <div v-on:click="eraser(functionName)" class='C'>Eraser</div>
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
import {Point, Line, Context} from '@/canvas'
import {FunctionDefinition, Compose, PredefinedFunction, PredefinedFunctionTrigonometry} from '@/function'
import {Prop} from "vue-property-decorator";

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

function sin(x: number) {
  return Math.sin(x)
}
function cos(x: number) {
  return Math.cos(x)
}
function tg(x: number) {
  return Math.tan(x)
}
function ctg(x: number) {
  return 1 / Math.tan(x);
}
function arcsin(x: number) {
  return Math.asin(x)
}
function arccos(x: number) {
  return Math.acos(x)
}
function arctg(x: number) {
  return Math.atan(x)
}
function arcctg(x: number) {
  return Math.PI / 2 - Math.atan(x);
}
function PI () {
  return Math.PI
}

@Component
export default class HelloWorld extends Vue {
  vueCanvas!: any
  maxX = 4
  maxY = 4
  functionName = "Math.tan(x)"

  selectedDisplayShapeText = ""

  functionColor = "#29a0a4"
  PIx = false
  PIy = false
  ef = false
  fns: FunctionDefinition[] = []
  funcSymbol = "ƒ(x)"
  funcSymbols = ["ƒ(x)", "α(x)", "β(x)", "γ(x)", "ζ(x)", "ϑ(x)", "ϰ(x)", "φ(x)", " χ(x)", "ψ(x)", "ω(x)", "ϱ(x)"]
  nextId = 1
  @Prop() funcOperators: Array<PredefinedFunction>
  @Prop() funcOperatorsTrigonometry: Array<PredefinedFunctionTrigonometry>

  isTrigFn(): boolean {
    return this.funcOperatorsTrigonometry.length > 0
  }

  isNormalFn(): boolean {
    return this.funcOperators.length > 0
  }

  mounted(): void {
    this.vueCanvas = (document.getElementById("canvas") as any).getContext("2d");
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
        this.functionName = this.functionName.replace(/(?!\w)*x(?!\w)*/g, "("+fn.text+")")
        break
    }
  }

  onPredefinedFunctionClickTrig() {
    this.functionName = this.selectedDisplayShapeText
  }

  private calculateMaxY() {
    let maxY = this.maxY
    if (this.PIy) {
      maxY = this.maxY * Math.PI;
    }
    return maxY;
  }

  private calculateMaxX() {
    let maxX = this.maxX
    if (this.PIx) {
      maxX = this.maxX * Math.PI;
    }
    return maxX;
  }

  drawRect() {
    const maxX = this.calculateMaxX();
    const maxY = this.calculateMaxY();
    const ctx = new Context(this.vueCanvas, 600, 10, 600, 10, maxX, maxY);

    ctx.clearRect();

    ctx.beginPath();
    ctx.rect(-maxX, maxY, 2 * maxX, 2 * maxY);
    ctx.setStrokeStyle('#22695c');
    ctx.setLineWidth(2);

    //ось ОХ
    ctx.moveTo(new Point(maxX, 0))
    ctx.lineTo(new Point(-maxX, 0))

    //ось ОУ
    ctx.moveTo(new Point(0, maxY))
    ctx.lineTo(new Point(0, -maxY))

    ctx.stroke();

    ctx.beginPath();
    ctx.setLineWidth(1);
    let unitSegmentX = 1;
    if (this.PIx) {
      unitSegmentX = Math.PI;
    }
    //Цикл для рисования сетки по ОХ
    for (let x1 = -maxX; x1 < maxX; x1 = x1 + unitSegmentX) {
      ctx.moveTo(new Point(x1, -maxY))
      ctx.lineTo(new Point(x1, maxY))
    }

    let unitSegmentY = 1;
    if (this.PIy) {
      unitSegmentY = Math.PI;
    }
    //Цикл для рисования сетки по ОY
    for (let y1 = -maxY; y1 < maxY; y1 = y1 + unitSegmentY) {
      ctx.moveTo(new Point(-maxX, y1))
      ctx.lineTo(new Point(maxX, y1))
    }
    ctx.stroke();

    this.fns.forEach(fnDef => {
      console.info("fnDef = " + fnDef.fn)
      const fn = function (x: number) {
        return eval(fnDef.fn)
      }

      //график
      if (this.PIx) {
        const step = 1/maxX;
        ctx.drawCurve(maxX, step, fn, fnDef.color)
      } else if (this.ef) {
        const stepFunction = maxX * 80
        const step = 1 / stepFunction;
        ctx.drawCurve(stepFunction, step, fn, fnDef.color)
      } else {
        const stepFunction = maxX * 10
        const step = 1 / stepFunction;
        ctx.drawCurve(stepFunction, step, fn, fnDef.color)
      }
    })

    //название осей

    ctx.beginPath();
    ctx.setLineWidth(1);
    ctx.setStrokeStyle("#08191c");
    ctx.setFont('10px Courier New, monospace');

    let unitSegmentXforTextX = 1;
    if (this.PIx) {
      unitSegmentXforTextX = Math.PI;
    }
    for (let i = -2*maxX; i < maxX; i = i + unitSegmentXforTextX) {
      ctx.moveTo(new Point(i, maxY / 20))
      ctx.lineTo(new Point(i, -maxY / 20))
      ctx.fillText(i.toFixed(2), i, -maxY/8);
    }

    let unitSegmentXforTextY = 1;
    if (this.PIy) {
      unitSegmentXforTextY = Math.PI;
    }
    for (let i=-2*maxY; i <  maxY; i = i + unitSegmentXforTextY) {
      ctx.moveTo(new Point(maxX / 20, i))
      ctx.lineTo(new Point(-maxX / 20, i))
      ctx.fillText(i.toFixed(2), maxX/8, i);
    }
    ctx.stroke();
  }
}
</script>

<style>
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
  font-family: Times, Times New Roman, serif;
  font-size: 20px;
  width: 70px;
  height: 30px;
  border-radius: 2px;
  border: 4px double #459295;
  margin: -63% 100%;
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



.C {
  margin: -10% 5%;
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