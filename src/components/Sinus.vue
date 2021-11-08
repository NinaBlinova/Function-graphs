<template>
  <div>
    <router-link to="/properties">Back</router-link>
    <div>
      <div class="rectangleS"><span>y = </span><input v-model="a" class="aS">&#xD7;<span> sin(x&#xD7;</span><input v-model="b" class="bS"> + <input v-model="c" class="сS">) + <input v-model="d" class="dS">
      </div>
      <Graph
          :function-name=functionName()
          :display-calculator=false
          :display-pi=true
          :func-operators=funcOperators
          :func-operators-trigonometry=funcOperatorsTrigonometry>
      </Graph>
      <table class="TableL">
        <tr>
          <th>      <div class="PropertiesSinus">
            <h1>Linear function properties</h1>
            <ol class="Sin1">
              <li>D(f) &#8712; R</li>
              <li> E(f): {{efSin()}}</li>
              <li>k &#8712; Z</li>
              <li>{{ParityOddSin()}}</li>
              <li>Функция периодическая: T = {{period()}}</li>
              <li>Промежутки монотонности: {{intervalsOfMonotonyMinusInfinitySin()}}, {{intervalsOfMonotonyPlusInfinitySin()}}</li>
            </ol>
          </div> </th>
          <th>      <div class="ConstructionSinus">
            <h1>Construction of a quadratic function</h1>
            <ol class="Sin2">
              <li>{{coefficientD()}}</li>
              <li>Все ординаты умножаются на  {{a}}</li>
              <li>Все абсциссы делятся на  {{b}}.</li>
            </ol>
          </div> </th>
        </tr>

      </table>

    </div>
  </div>
</template>

<script lang="ts">
  import {Compose, PredefinedFunction, PredefinedFunctionTrigonometry} from "@/function";
  import Graph from "@/components/Graph.vue";
  import Vue from "vue";
  import Component from "vue-class-component";


  @Component({
  components: {
  Graph
}
})
  export default class QuadraticFunction extends Vue {
  funcOperators: Array<PredefinedFunction> = [
  new PredefinedFunction(1, "<span>x</span>", "x", Compose.NONE)
  ]

  funcOperatorsTrigonometry: Array<PredefinedFunctionTrigonometry> = []

  a = 1
  b = 2
  c = 3
  d = 1

  functionName(): string {
  return  this.a + "*Math.sin(x*" + this.b+ "+" + this.c + ")" + "+" + this.d;
    }

    efSin() {
    if (this.a != 1){
      return "[" + -this.a + ";" + this.a + "]"
    }
    else{
      return "[" + "-1" + ";" + "1" + "]"
    }
    }
    ParityOddSin(){
      if (this.c == 0 && this.d == 0) {
        return "Функция нечётная"
      }
      else {
        return "Функция ни чётная, ни нечётная"
      }
    }
    period() {
    if(this.b != 1) {
      return (2*Math.PI / this.b).toFixed(2)
    }
    }

    intervalsOfMonotonyMinusInfinitySin(): string {
      if (this.a > 0) {
        return "Убывает:" + "[" + ((Math.PI/2 -this.c)/this.b).toFixed(2)  + "+" +  this.period() + "k" +";" + ((3*Math.PI/2 -this.c)/this.b).toFixed(2) + "+" +  this.period()+ "k" + "]"
      } else {
        return "Возрастает:" + "[" + ((Math.PI/2 -this.c)/this.b).toFixed(2)  + "+" +  this.period() + "k" +";" + ((3*Math.PI/2 -this.c)/this.b).toFixed(2) + "+" +  this.period()+ "k" + "]"
      }
    }

    intervalsOfMonotonyPlusInfinitySin(): string {
      if (this.a > 0) {
        return "Возрастает:" + "[" + ((-Math.PI/2 + -this.c)/this.b).toFixed(2) + "+" + this.period() + "k" +";" + ((Math.PI/2 + -this.c)/this.b).toFixed(2) + "+" + this.period()+ "k" + "]"
      } else {
        return "Убывает:" + "[" + ((-Math.PI/2 + -this.c)/this.b).toFixed(2) + "+" + this.period() + "k" +";" + ((Math.PI/2 + -this.c)/this.b).toFixed(2) + "+" + this.period()+ "k" + "]"
      }
    }
    coefficientD(){
      if (this.d > 0) {
        return "Сдвигаем график на " + this.d + " вверх."
      }
      else if (this.d < 0) {
        return "Сдвигаем график на " + this.d + " вниз."
      }
      else{
        return "Т.к. d = 0, то график никуда не двигаем"
      }
    }

  }
</script>

<style scoped>
.rectangleS {
  margin-left: auto;
  margin-right: auto;
  width: 260px;
  height: 40px;
  background: #89c7d2;
  border: 4px double #364a52;
  font-family: cursive;
  display: flex;
  justify-content: center;
  align-items: center;
}
.aS {
  color: black;
  height: 30px;
  width: 30px;
}

.bS {
  color: black;
  height: 30px;
  width: 30px;
}

.сS {
  color: black;
  height: 30px;
  width: 30px;
}
.dS {
  color: black;
  height: 30px;
  width: 30px;
}

.PropertiesSinus {
  background: #89c7d2;
  text-align: center;
  width: 800px;
  height: 100px;
  border: 4px double #364a52;
}

.PropertiesSinus h1 {
  font-family: Luminari, fantasy;
  position: relative;
  color: #364a52;
  font-size: 40px;
  font-weight: normal;
  padding: 8px 20px 7px 20px;
  border-top: 4px solid;
  border-left: 4px solid;
  display: inline-block;
  margin-top: 30px;
  line-height: 1;
}

.PropertiesSinus h1:before {
  content: "";
  position: absolute;
  width: 28px;
  height: 28px;
  top: -28px;
  left: -28px;
  border: 4px solid #364a52;
  box-sizing: border-box;
}


.Sin1 {
  margin-top: 20px;
  list-style: none;
  width: 700px;
  font-family: cursive;
  text-align: justify;
  color: #364a52;
  text-decoration: none;
  display: inline-block;
  padding-left: 25px;
  height: 44px;
  line-height: 44px;
  font-size: 20px;
  position: relative;
  transition: .3s linear;
}


.Sin1 li {
  position: relative;
}

.Sin1 li:before {
  content: "";
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #1c4b5c;
  position: absolute;
  top: 12px;
  left: -30px;
  z-index: 2;
  transition: .4s ease-in-out;
}

.Sin1 li:hover:before {
  left: -20px;
}

.ConstructionSinus {
  background: #89c7d2;
  text-align: center;
  width: 800px;
  height: 100px;
  border: 4px double #364a52;
}

.ConstructionSinus h1 {
  font-family: Luminari, fantasy;
  position: relative;
  color: #364a52;
  font-size: 40px;
  font-weight: normal;
  padding: 8px 20px 7px 20px;
  border-top: 4px solid;
  border-left: 4px solid;
  display: inline-block;
  margin-top: 30px;
  line-height: 1;
}

.ConstructionSinus h1:before {
  content: "";
  position: absolute;
  width: 28px;
  height: 28px;
  top: -28px;
  left: -28px;
  border: 4px solid #364a52;
  box-sizing: border-box;
}
.Sin2 {
  list-style: none;
  margin-top: 20px;
  font-family: cursive;
  text-align: justify;
  width: 95%;
  color: #364a52;
  text-decoration: none;
  display: inline-block;
  padding-left: 25px;
  height: 44px;
  line-height: 44px;
  font-size: 20px;
  position: relative;
  transition: .3s linear;
}
.Sin2 li {
  position: relative;
}

.Sin2 li:before {
  content: "";
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #1c4b5c;
  position: absolute;
  top: 12px;
  left: -30px;
  z-index: 2;
  transition: .4s ease-in-out;
}

.Sin2 li:hover:before {
  left: -20px;
}
.TableS{
  margin-left: auto;
  margin-right: auto;
}
</style>