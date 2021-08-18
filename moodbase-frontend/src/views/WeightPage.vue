<template>
  <div class="Weights">
    <br>
    <keep-alive>
    <Weights />
    </keep-alive>
  </div>
</template>
<script>
// @ is an alias to /src
import {defineAsyncComponent} from 'vue'
// import Weights from '../components/Weights.vue'
export default {
  name: 'WeightPage',
  components: {
    Weights: defineAsyncComponent(() => import('../components/Weights.vue')
  )
   },
}
</script>