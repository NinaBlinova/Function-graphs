<template>
  <div>
    <router-link to="/">Title</router-link>
    <h1 class = 'PageName'>{{ msg }}</h1>
    <Graph
        :display-calculator = true
        :display-pi = true
        :func-operators = funcOperators
        :func-operators-trigonometry = funcOperatorsTrigonometry>
    </Graph>
  </div>



</template>

<script>
import Graph from "@/components/Graph";
import {Compose, PredefinedFunction, PredefinedFunctionTrigonometry} from "@/function";

export default {
  name: "PlotFunction",
  data() {
    return {
      msg: 'Plotting the function',
      funcOperators: [
        new PredefinedFunction(1, "<span>x<sup>m/n</sup></span>", "x**(m/n)", Compose.NONE),
        new PredefinedFunction(2, "<span>log<sub>n</sub>x</span>", "Log(n,x)", Compose.NONE),
        new PredefinedFunction(3, "<span><sup>2n</sup>&#8730;x<sup>m</sup></span>", "Root1(x, n, m)", Compose.NONE),
        new PredefinedFunction(4, "<span><sup>2n+1</sup>&#8730;x<sup>m</sup></span>", "Root2(x, n, m)", Compose.NONE),
        new PredefinedFunction(5, "<span>(&#925;)<sup>x</sup></span>", "EF(N, x)", Compose.NONE),
        new PredefinedFunction(6, "<span>|x|</span>", "ABS(x)", Compose.NONE),
        new PredefinedFunction(7, "<span>sign(x)</span>", "SIGN(x)", Compose.NONE),
        new PredefinedFunction(8, "<span><sup>1</sup>/<sub>&#402;(x)</sub></span>", "1/ƒ(x)", Compose.DIRECT),
        new PredefinedFunction(9, "<span>&#402;(<sup>1</sup>/<sub>x</sub>)</span>", "1/x", Compose.REVERSE)
      ],
      funcOperatorsTrigonometry: [
        new PredefinedFunctionTrigonometry(1, "sin(x)", "sin(x)"),
        new PredefinedFunctionTrigonometry(2, "cos(x)", "cos(x)"),
        new PredefinedFunctionTrigonometry(3, "tg(x)", "tg(x)"),
        new PredefinedFunctionTrigonometry(4, "ctg(x)", "ctg(x)"),

        new PredefinedFunctionTrigonometry(5, "arcsin(x)", "arcsin(x)"),
        new PredefinedFunctionTrigonometry(6, "arccos(x)", "arccos(x)"),
        new PredefinedFunctionTrigonometry(7, "arctg(x)", "arctg(x)"),
        new PredefinedFunctionTrigonometry(8, "arcctg(x)", "arcctg(x)")
      ]
    }
  },
  components: {Graph}
}
</script>

<style scoped>
  .PageName {
    font-family: Luminari, fantasy;
  }


</style>