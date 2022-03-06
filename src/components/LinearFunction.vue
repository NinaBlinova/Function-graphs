<template>
  <div>
    <router-link to="/properties">Back</router-link>
    <div>

      <div class="rectangleL"><span>y = </span><input v-model="a" class="aL"><span>&#xD7; x + </span><input v-model="b" class="bL">
      </div>

      <Graph
          :function-name = functionName()
          :display-calculator = false
          :display-pi = false
          :func-operators = funcOperators
          :func-operators-trigonometry = funcOperatorsTrigonometry>
      </Graph>
      <table class="TableL">
        <tr>
          <th>      <div class = "LinearFunctionProperties">
            <h1>Function properties</h1>
            <ol class="ball">
              <li>D(f) &#8712; R</li>
              <li>E(f) &#8712; R</li>
              <li>График линейной функции — прямая.
                Для построения прямой достаточно знать две точки. Положение прямой на координатной плоскости зависит от значений коэффициентов k и b.</li>
              <li>Функция не имеет ни наибольшего, ни наименьшего значений.</li>
              <li>Свойством периодичности линейная функция не обладает, потому что данная функция является непрерывной.</li>
              <li>Функция монотонно возрастает на области определения при k > 0 и монотонно убывает при k &#60; 0.</li>
            </ol>
          </div> </th>
          <th> <div class = "LinearFunctionConstruction">
            <h1>Linear function construction</h1>
            <ol class="ball1">
              <li>Все ординаты умножаются на  <span>{{a}}</span>.</li>
              <li>График сдвигается на <span>{{b}}</span> вдоль оси OY.</li>
              <li>Нули функции: x = {{FunctionZerosL()}}.</li>
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
  b = 0


  functionName(): string {
    return  this.a + "*x+" + this.b;
  }
  FunctionZerosL(){
    return (-this.b/this.a).toFixed(2)
  }

}
</script>


<style>
.aL{
  color: black;
  height: 30px;
  width: 30px;
}

.bL{
  color: black;
  height: 30px;
  width: 30px;
}

.rectangleL {
  margin-left: auto;
  margin-right: auto;
  width: 220px;
  height: 40px;
  background: #89c7d2;
  border: 4px double #364a52;
  font-family: cursive;
  display: flex;
  justify-content:center;
  align-items: center;
}

.rectangleL:hover {
  -webkit-box-shadow: 0px 0px 20px rgba(21,21,87,0.8);
  -moz-box-shadow: 0px 0px 20px rgba(21,21,87,0.8);
  box-shadow: 0px 0px 20px rgba(21,21,87,0.8);
}

.LinearFunctionProperties{
  background: #89c7d2;
  text-align: center;
  width: 800px;
  height: 100px;
  border: 4px double #364a52;
}

.LinearFunctionProperties h1 {
  font-family: Luminari, fantasy;
  position: relative;
  color:  #364a52;
  font-size: 40px;
  font-weight: normal;
  padding: 8px 20px 7px 20px;
  border-top: 4px solid;
  border-left: 4px solid;
  display: inline-block;
  margin-top: 30px;
  line-height: 1;
}

.LinearFunctionProperties h1:before {
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

.ball li {position: relative;}
.ball li:before {
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
.ball li:hover:before {left: -20px;}

.LinearFunctionConstruction{
  background: #89c7d2;
  float: right;
  display: inline;
  text-align: center;
  width: 800px;
  height: 100px;
  border: 4px double #364a52;
  margin-left: 56.8%;
}

.LinearFunctionConstruction h1 {
  font-family: Luminari, fantasy;
  position: relative;
  color:  #364a52;
  font-size: 40px;
  font-weight: normal;
  padding: 8px 20px 7px 20px;
  border-top: 4px solid;
  border-left: 4px solid;
  display: inline-block;
  margin-top: 30px;
  line-height: 1;
}

.LinearFunctionConstruction h1:before {
  content: "";
  position: absolute;
  width: 28px;
  height: 28px;
  top: -28px;
  left: -28px;
  border: 4px solid #364a52;
  box-sizing: border-box;
}


.ball1 {
  margin-top: 20px;
  list-style: none;
  width: 700px;
  margin-left: 5%;
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

.ball1 li {position: relative;}
.ball1 li:before {
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
.ball1 li:hover:before {left: -20px;}
.TableL{
  margin-left: auto;
  margin-right: auto;
}

</style>