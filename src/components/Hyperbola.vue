<template>
  <div>
    <router-link to="/properties">Back</router-link>
    <div>
      <div class="rectangleH"><span class = "yH">y = </span><input v-model="k" class="kH">
        <input v-model="a" class="aH"><span class="xH"> + x</span><span class = "plusH"> + </span><input v-model="b" class="bH">
      </div>
      <Graph
          :function-name=functionName()
          :display-calculator=false
          :display-pi=false
          :func-operators=funcOperators
          :func-operators-trigonometry=funcOperatorsTrigonometry>
      </Graph>
      <table class="TableH">
        <tr>
          <th>      <div class="PropertiesHyperbola">
            <h1>Function properties</h1>
            <ol class="Hyperbola1">
              <li>D(F): {{dfMinusInfinity()}} &#965; {{dfPlusInfinity()}}</li>
              <li> E(f): {{ efMinusInfinity() }} &#965; {{ efPlusInfinity() }}</li>
              <li>Наименьшего значения нет; наибольшего значения нет.</li>
              <li>Снизу и сверху не ограничена.</li>
              <li>Промежутки монотонности: {{intervalsOfMonotonyMinusInfinityHyperbola()}}, {{intervalsOfMonotonyPlusInfinityHyperbola()}}</li>
              <li>{{ParityOdd()}}</li>
            </ol>
          </div> </th>
          <th>      <div class="ConstructionHyperbola">
            <h1>Construction of a hyperbola</h1>
            <ol class="Hyperbola2">
              <li>Асимптоты: y = {{AsymptotesB()}}, x = {{AsymptotesA()}}</li>
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

  k = 1
  a = 2
  b = 3

  functionName(): string {
    return  this.k + "/"+ "(x+" + this.a + ")" + "+" + this.b;
  }

  coefficientB(){
    if (this.b != 0) {
      return this.b
    }
  }
  coefficientA(){
    if (this.a != 0) {
      return -this.a
    }
  }

  efMinusInfinity(): string {
    if (this.b != 0) {
      return "(" + "-∞" + ";" + this.coefficientB() + ")"
    } else {
      return "(" + "-∞" + ";" + "0" + ")"
    }
  }
  efPlusInfinity(): string {
    if (this.b != 0) {
      return "("+ this.coefficientB() + ";" + "+∞" + ")"
    } else {
      return "("+ "0"+ ";" + "+∞" + ")"
    }
  }

  dfMinusInfinity(): string {
    if (this.b != 0) {
      return "(" + "-∞" + ";" + this.coefficientA() + ")"
    } else {
      return "(" + "-∞" + ";" + "0" + ")"
    }
  }
  dfPlusInfinity(): string {
    if (this.b != 0) {
      return "("+ this.coefficientA() + ";" + "+∞" + ")"
    } else {
      return "("+ "0"+ ";" + "+∞" + ")"
    }
  }

  ParityOdd(){
    if (this.a == 0 && this.b == 0) {
      return "Функция нечётная"
    }
    else {
      return "Функция ни чётная, ни нечётная"
    }
  }
  intervalsOfMonotonyMinusInfinityHyperbola(): string {
    if (this.k > 0) {
      return "Убывает:" + "(" + "-∞" + ";" + this.coefficientA() + ")"
    } else {
      return "Возрастает:" +"(" + "-∞" + ";" + this.coefficientA() + ")"
    }
  }
  intervalsOfMonotonyPlusInfinityHyperbola(): string {
    if (this.k > 0) {
      return "Убывает:" + "(" + this.coefficientA() + ";" + "+∞"  + ")"
    } else {
      return "Возрастает:" + "(" + this.coefficientA() + ";" + "+∞"  + ")"
    }
  }
  AsymptotesA() {
    if(this.a != 0) {
      return -this.a
    }
  }
  AsymptotesB() {
    if(this.b != 0) {
      return this.b
    }
  }

}

</script>

<style scoped>
.rectangleH {
  margin-left: auto;
  margin-right: auto;
  width: 230px;
  height: 100px;
  background: #89c7d2;
  border: 4px double #364a52;
  font-family: cursive;
  display: flex;
  justify-content:center;
  align-items: center;
}
.yH {
  margin-left:-10px;
}
.aH {
  margin-top: 50px;
  margin-left: -40px;
  color: black;
  height: 30px;
  width: 30px;
}
.xH {
  margin-top: 40px;
  margin-left: 13px;
}

.bH {
  margin-left: 20px;
  color: black;
  height: 30px;
  width: 30px;
}

.kH {
  margin-top: -60px;
  margin-left: 20px;
  color: black;
  height: 30px;
  width: 30px;
}
.plusH {
  margin-left: 10px;
}
.PropertiesHyperbola {
  background: #89c7d2;
  text-align: center;
  width: 800px;
  height: 100px;
  border: 4px double #364a52;
}

.PropertiesHyperbola h1 {
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

.PropertiesHyperbola h1:before {
  content: "";
  position: absolute;
  width: 28px;
  height: 28px;
  top: -28px;
  left: -28px;
  border: 4px solid #364a52;
  box-sizing: border-box;
}

.Hyperbola1 {
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


.Hyperbola1 li {
  position: relative;
}

.Hyperbola1 li:before {
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

.Hyperbola1 li:hover:before {
  left: -20px;
}

.ConstructionHyperbola {
  background: #89c7d2;
  text-align: center;
  width: 800px;
  height: 100px;
  border: 4px double #364a52;
}

.ConstructionHyperbola h1 {
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

.ConstructionHyperbola h1:before {
  content: "";
  position: absolute;
  width: 28px;
  height: 28px;
  top: -28px;
  left: -28px;
  border: 4px solid #364a52;
  box-sizing: border-box;
}
.Hyperbola2 {
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
.Hyperbola2 li {
  position: relative;
}

.Hyperbola2 li:before {
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

.Hyperbola2 li:hover:before {
  left: -20px;
}
.TableH{
  margin-left: auto;
  margin-right: auto;
}
</style>