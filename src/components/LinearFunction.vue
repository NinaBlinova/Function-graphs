<template>
  <div>
    <router-link to="/properties">Back</router-link>
    <div>

      <div class="rectangle"><span>y = </span><input v-model="a" class="a"><span>* x + </span><input v-model="b" class="b">
      </div>

      <Graph
          :function-name = functionName
          :display-calculator = false
          :display-pi = false
          :func-operators = funcOperators
          :func-operators-trigonometry = funcOperatorsTrigonometry>
      </Graph>

      <div class = "LinearFunctionProperties">
        <h1>Linear function properties</h1>
        <ol class="ball">
          <li><a href="#">D(f) &#8712; R</a></li>
          <li><a href="#">E(f) &#8712; R</a></li>
          <li><a href="#">График линейной функции — прямая.
            Для построения прямой достаточно знать две точки. Положение прямой на координатной плоскости зависит от значений коэффициентов k и b.</a></li>
          <li><a href="#">Функция не имеет ни наибольшего, ни наименьшего значений.</a></li>
          <li><a href="#">Свойством периодичности линейная функция не обладает, потому что данная функция является непрерывной.</a></li>
          <li><a href="#">Функция монотонно возрастает на области определения при k > 0 и монотонно убывает при k &#60; 0.</a></li>
        </ol>
      </div>

      <div class = "LinearFunctionConstruction">
        <h1>Linear function construction</h1>
        <ol class="ball1">
          <li><a href="#">Все ординаты умножаются на  <span>{{a}}</span>.</a></li>
          <li><a href="#">График сдвигается на <span>{{b}}</span> единиц вдоль оси OY.</a></li>
        </ol>
      </div>


    </div>
  </div>
</template>

<script>
import {Compose, PredefinedFunction} from "@/function";
import Graph from "@/components/Graph";

export default {
  name: "LinearFunction",
  data() {
    return {
      funcOperators: [
        new PredefinedFunction(1, "<span>x</span>", "x", Compose.NONE)
      ],
      funcOperatorsTrigonometry: [],
      a: 1,
      b: 0
    }
  },
  computed: {
    functionName() {
      return "" + this.a + " * x + " + this.b;
    }
  },
  components: {Graph}
}

</script>


<style>
.a{
  color: black;
  height: 30px;
  width: 30px;
}

.b{
  color: black;
  height: 30px;
  width: 30px;
}

.rectangle {
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

.rectangle:hover {
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
.ball li {position: relative;}
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
.ball li:hover:before {left: -20px;}

.LinearFunctionConstruction{
  background: #89c7d2;
  text-align: center;
  width: 800px;
  height: 100px;
  border: 4px double #364a52;
  margin-left: 1080px;
  margin-top: -112px;
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
}

.ball1 a {
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
.ball1 a:before {
  content: "";
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #425273;
  position: absolute;
  left: -30px;
  top: 7px;
}
.ball1 li {position: relative;}
.ball1 li:before {
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
.ball1 li:hover:before {left: -20px;}

</style>