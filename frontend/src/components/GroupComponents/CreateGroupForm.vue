<template>
 <div class="flexc">
   <div class="flexr">
    <colorful-box-2 quadrant="one"  />
    <colorful-box-2 quadrant="two"  />
    </div>
    <div class="flexr">
    <colorful-box-2 quadrant="three" />
    <colorful-box-2 quadrant="four"  />
    </div>
</div>

</template>

<script>

import ColorfulBox2 from '@/components/PlotComponents/GridComponents/ColorfulBox2.vue'
export default {
  name:'CreateGroupForm',
  components: {ColorfulBox2},
  computed: {
  }

}
</script>

<style scoped>
.flexr{
  display:flex;
  margin:0;
  padding:0;
  flex-direction:row;
}
.flexc{
  display:flex;
  margin:0;
  padding:0;
  flex-direction:column;
}
</style>
