<template>
  <div>
    <router-link to="/properties">Back</router-link>
    <div>
      <div class="rectangleQ"><span>y = </span><input v-model="a" class="aQ"><span> &#xD7; x<sup>2</sup> +</span><input v-model="b" class="bQ">
        <span> &#xD7; x +</span><input v-model="c" class="сQ">
      </div>
      <Graph
          :function-name=functionName()
          :display-calculator=false
          :display-pi=false
          :func-operators=funcOperators
          :func-operators-trigonometry=funcOperatorsTrigonometry>
      </Graph>
      <table class="TableQ">
        <tr>
          <th> <div class="PropertiesOfAQuadraticFunction">
            <h1>Function properties</h1>
            <ol class="Quadratic">
              <li>D(f) &#8712; R</li>
              <li> E(f): {{ ef() }}</li>
              <li>При а > 0 наименьшим значением параболы является её вершина, а наибольшего не существует.
                При а &#60; 0 наибольшим значением параболы является вершина, а наименьшего не существует.</li>
              <li>Функция непериодическая.</li>
              <li>Вершина параболы находится по формуле: (<sup>-b</sup>/<sub>2*a</sub>; c -
                (<sup>b<sup>2</sup></sup>/<sub>4*a</sub>)).</li>
              <li>Промежутки монотонности: {{intervalsOfMonotonyMinusInfinity()}}, {{intervalsOfMonotonyPlusInfinity()}}</li>
            </ol>
          </div></th>
          <th>      <div class="ConstructionOfAQuadraticFunction">
            <h1>Construction of a quadratic function</h1>
            <ol class="construction">
              <li>Вершина параболы: ({{x()}}; {{y()}}).</li>
              <li>Нули функции: x<sub>1</sub> = {{ FunctionZerosQM() }}, x<sub>2</sub> = {{ FunctionZerosQP() }}.</li>
            </ol>
          </div></th>
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
  b = 0
  c = 0

  functionName(): string {
    return  this.a + "*x**2+" + this.b + "*x+" + this.c;
  }

  x(): number {
    return -this.b / (2 * this.a)
  }

  y(): number {
    return this.c - this.b ** 2 / (4 * this.a)
  }

  ef(): string {
    if (this.a > 0) {
      return "[" + this.y() + ";" + "+∞" + ")"
    } else {
      return "(" + "-∞" + ";" + this.y() + "]"
    }
  }

  intervalsOfMonotonyMinusInfinity(): string {
    if (this.a > 0) {
      return "Убывает:" + "(" + "-∞" + ";" + this.x() + "]"
    } else {
      return "Возрастает:" +"(" + "-∞" + ";" + this.x() + "]"
    }
  }

  intervalsOfMonotonyPlusInfinity(): string {
    if (this.a > 0) {
      return "Возрастает:" + "[" + this.x() + ";" + "+∞"  + ")"
    } else {
      return "Убывает:" + "[" + this.x() + ";" + "+∞"  + ")"
    }
  }
  FunctionZerosQP(){
      return (-this.b + (this.b**2 - 4 * this.a * this.c)**0.5)/(2*this.a)
    }

  FunctionZerosQM(){
      return (-this.b - (this.b**2 - 4 * this.a * this.c)**0.5)/(2*this.a)
  }

}

</script>
<style>
.aQ {
  color: black;
  height: 30px;
  width: 30px;
}

.bQ {
  color: black;
  height: 30px;
  width: 30px;
}

.сQ {
  color: black;
  height: 30px;
  width: 30px;
}

.rectangleQ {
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

.rectangleQ:hover {
  -webkit-box-shadow: 0px 0px 20px rgba(21, 21, 87, 0.8);
  -moz-box-shadow: 0px 0px 20px rgba(21, 21, 87, 0.8);
  box-shadow: 0px 0px 20px rgba(21, 21, 87, 0.8);
}

.PropertiesOfAQuadraticFunction {
  background: #89c7d2;
  text-align: center;
  width: 800px;
  height: 100px;
  border: 4px double #364a52;
}

.PropertiesOfAQuadraticFunction h1 {
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

.PropertiesOfAQuadraticFunction h1:before {
  content: "";
  position: absolute;
  width: 28px;
  height: 28px;
  top: -28px;
  left: -28px;
  border: 4px solid #364a52;
  box-sizing: border-box;
}


.Quadratic {
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


.Quadratic li {
  position: relative;
}

.Quadratic li:before {
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

.Quadratic li:hover:before {
  left: -20px;
}

.ConstructionOfAQuadraticFunction {
  background: #89c7d2;
  text-align: center;
  width: 800px;
  height: 100px;
  border: 4px double #364a52;

}

.ConstructionOfAQuadraticFunction h1 {
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

.ConstructionOfAQuadraticFunction h1:before {
  content: "";
  position: absolute;
  width: 28px;
  height: 28px;
  top: -28px;
  left: -28px;
  border: 4px solid #364a52;
  box-sizing: border-box;
}
.construction {
  list-style: none;
  margin-top: 20px;
  font-family: cursive;
  text-align: justify;
  width: 100%;
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
.construction li {
  position: relative;
}

.construction li:before {
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

.construction li:hover:before {
  left: -20px;
}
.TableQ{
  margin-left: auto;
  margin-right: auto;
}
</style>