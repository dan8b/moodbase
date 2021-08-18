<template>
  <div id="v-model-multiple-checkboxes">
    <Checkbox id="Calm" value="calm" labelVal="Anxiety over time" />
    <Checkbox id="happy" value="happy" labelVal="Depression over time" />
    <Checkbox id="plot" value="plot" labelVal="Plot over time" />

  <br />
</div>
</template>

<script>
  import Checkbox from '@/components/Checkbox.vue'

export default {
    name: 'Checkboxes',
    components: { Checkbox},
}
</script>

<style>

</style>