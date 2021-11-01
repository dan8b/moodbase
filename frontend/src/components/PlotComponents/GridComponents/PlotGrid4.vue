<template >

<div  class="flexct">

    <button margin-bottom="10%" v-if="currentlyActiveQuadrant!==''" @click="unselectQuadrant"> Take me back </button>

    <div  class="flexr">

        <colorful-box-2 :quadrantData="quadrants.one" >

            <text-element :variableAndQuadrantData="prepareQuadrantDataForTextElement('one',true)" />
            <text-element :variableAndQuadrantData="prepareQuadrantDataForTextElement('one',false)" y="40%"/>

        </colorful-box-2>

        <colorful-box-2  :quadrantData="quadrants.two"  >
            <text-element :variableAndQuadrantData="prepareQuadrantDataForTextElement('two',true)" />
            <text-element :variableAndQuadrantData="prepareQuadrantDataForTextElement('two',false)" y="40%"/>
        </colorful-box-2>

    </div>

    <div class="flexr">

        <colorful-box-2  :quadrantData="quadrants.three">
            <text-element :variableAndQuadrantData="prepareQuadrantDataForTextElement('three',true)" />
            <text-element :variableAndQuadrantData="prepareQuadrantDataForTextElement('three',false)" y="40%"/>
        </colorful-box-2>

        <colorful-box-2 :quadrantData="quadrants.four"  >
            <text-element :variableAndQuadrantData="prepareQuadrantDataForTextElement('four',true)" />
            <text-element :variableAndQuadrantData="prepareQuadrantDataForTextElement('four',false)" y="40%"/>
        </colorful-box-2>
    </div>

</div>
</template>

<script>
// import Animator from '@/services/animation.service.js'
import TextElement from './TextElement.vue'
import ColorfulBox2 from './ColorfulBox2.vue'
// import PlotBox from './PlotBox.vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'PlotGrid4',
  components: {
    ColorfulBox2,
    TextElement
  },
  setup () {
    const store = useStore()
    const quadrants = store.getters['plotPage/organizeColorsByQuadrant']
    const currentlyActiveQuadrant = ref(store.state.plotPage.activeQuadrant)
    function prepareQuadrantDataForTextElement (number, horizontal) {
      if (horizontal === true) {
        return {
          variable: quadrants[number].x.variable,
          quadrant: quadrants[number].number
        }
      }
      else {
        return {
            variable: quadrants[number].y.variable,
            quadrant: quadrants[number].number
          }            
        }
    }
    return { currentlyActiveQuadrant, quadrants, prepareQuadrantDataForTextElement }
},
}


</script>

<style scoped>

.flexct{
    height:100%;
    display:flex;
    margin:0;
    padding:0;
    flex-direction:column;
}

</style>