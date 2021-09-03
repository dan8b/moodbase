<template>
  <div class="Weights">
    <br>
    <keep-alive>
    <Weights />
    </keep-alive>
  </div>
</template>
<script>
import {defineAsyncComponent} from 'vue'
export default {
  name: 'WeightPage',
  components: {
    Weights: defineAsyncComponent(() => import('../components/WeightFunctionalityComponents/Weights.vue')
  )
   },
}
</script>