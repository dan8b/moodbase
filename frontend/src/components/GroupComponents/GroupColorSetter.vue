<template>
   <div class="flexr">

        <colorful-box-2 quadrant="one" >
            <text-element quadrantNum="one" :variable="quadrants.one.data.xVar" />
            <text-element quadrantNum="one" :variable="quadrants.one.data.yVar" y="40%"/>
        </colorful-box-2>

        <colorful-box-2  quadrant="two"  >
            <text-element quadrantNum="two" :variable="quadrants.two.data.xVar" />
            <text-element quadrantNum="two" :variable="quadrants.two.data.yVar" y="40%"/>
        </colorful-box-2>

    </div>

    <div class="flexr">
        <colorful-box-2 quadrant="three">
            <text-element quadrantNum="three" :variable="quadrants.three.data.xVar" />
            <text-element quadrantNum="three" :variable="quadrants.three.data.yVar" y="40%"/>
        </colorful-box-2>
        <colorful-box-2 quadrant="four"  >
            <text-element  quadrantNum="four" :variable="quadrants.four.data.xVar" />
            <text-element quadrantNum="four" :variable="quadrants.four.data.yVar" y="40%"/>
        </colorful-box-2>
    </div>
</template>

<script>
import TextElement from './TextElement.vue'
import ColorfulBox2 from './ColorfulBox2.vue'
export default {
  name: 'GroupColorSetter',
  components: {
    TextElement,
    ColorfulBox2
  }
}
</script>

<style>

</style>
