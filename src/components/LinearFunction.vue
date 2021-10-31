<template>
  <div>
    <router-link to="/properties">Back</router-link>
    <div>
      <span>y = </span><input v-model="a"><span>* x + </span><input v-model="b">
      <Graph
          :function-name = functionName
          :display-calculator = false
          :display-pi = false
          :func-operators = funcOperators
          :func-operators-trigonometry = funcOperatorsTrigonometry>
      </Graph>

      <div>
        График сдвигается на <span style="color: brown">{{b}}</span>
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

</style>