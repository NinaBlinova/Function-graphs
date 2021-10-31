<template>
  <div>
    <router-link to="/properties">Back</router-link>
    <Graph
        :func-operators = funcOperators
        :func-operators-trigonometry = funcOperatorsTrigonometry>
    </Graph>
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
      funcOperatorsTrigonometry: []
    }
  },
  components: {Graph}
}

</script>


<style>

</style>