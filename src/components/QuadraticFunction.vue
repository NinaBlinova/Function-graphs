<template>
  <div>
    <router-link to="/properties">Back</router-link>
    <div>
      <div class="rectangle"><span>y = </span><input v-model="a" class="a"><span> * x^2 +</span><input v-model="b"
                                                                                                       class="b"><span> * x +
       </span><input v-model="c" class="с">
      </div>
      <Graph
          :function-name=functionName
          :display-calculator=false
          :display-pi=false
          :func-operators=funcOperators
          :func-operators-trigonometry=funcOperatorsTrigonometry>
      </Graph>

      <div class="PropertiesOfAQuadraticFunction">
        <h1>Linear function properties</h1>
        <ol class="ball">
          <li><a href="#">D(f) &#8712; R</a></li>
          <li><a href="#">При а > 0 наименьшим значением параболы является её вершина, а наибольшего не существует.
            При а &#60; 0 наибольшим значением параболы является вершина, а наименьшего не существует.</a></li>
          <li><a href="#">Функция непериодическая.</a></li>
          <li><a href="#">Вершина параболы находится по формуле: (<sup>-b</sup>/<sub>2*a</sub>; c -
            (<sup>b^2</sup>/<sub>4*a</sub>)).</a></li>
        </ol>
      </div>

      <div class="ConstructionOfAQuadraticFunction">
        <h1>Construction of a quadratic function</h1>
        <ol>
          <li>Вершина параболы: (<sup>-{{ b }}</sup>/<sub>2*{{ a }}</sub>; {{ c }} -
            (<sup>{{ b }}^2</sup>/<sub>4*{{ a }}</sub>)).
          </li>
          <li> E(f): {{ ef() }}</li>
        </ol>
      </div>

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
export default class LinearFunction extends Vue {
  funcOperators: Array<PredefinedFunction> = [
    new PredefinedFunction(1, "<span>x</span>", "x", Compose.NONE)
  ]

  funcOperatorsTrigonometry: Array<PredefinedFunctionTrigonometry> = []

  a = 1
  b = 0
  c = 0

  functionName(): string {
    return "" + this.a + "*x**2+" + this.b + "*x+" + this.c;
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

  intervalsOfMonotony(): string {
    if (this.a > 0) {
      return "(" + "-∞" + ";" + this.x() + "]"
    } else {
      return "(" + "-∞" + ";" + this.x() + "]"
    }
  }
}

</script>
<style>
.a {
  color: black;
  height: 30px;
  width: 30px;
}

.b {
  color: black;
  height: 30px;
  width: 30px;
}

.с {
  color: black;
  height: 30px;
  width: 30px;
}

.rectangle {
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

.rectangle:hover {
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


.ball {
  margin-top: 20px;
  list-style: none;
  width: 700px;
}

.ball a {
  font-family: 'Merriweather', serif;
  text-align: justify;
  width: 100%;
  color: #808285;
  text-decoration: none;
  display: inline-block;
  padding-left: 25px;
  height: 44px;
  line-height: 44px;
  font-size: 20px;
  position: relative;
  transition: .3s linear;
}

.ball a:before {
  content: "";
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #425273;
  position: absolute;
  left: -30px;
  top: 7px;
}

.ball li {
  position: relative;
}

.ball li:before {
  content: "";
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #89c7d2;
  position: absolute;
  top: 12px;
  left: -30px;
  z-index: 2;
  transition: .4s ease-in-out;
}

.ball li:hover:before {
  left: -20px;
}

.ConstructionOfAQuadraticFunction {
  background: #89c7d2;
  text-align: center;
  width: 800px;
  height: 100px;
  border: 4px double #364a52;
  margin-left: 1080px;
  margin-top: -112px;
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
</style>