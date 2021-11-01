<template >

<!-- a column-display flex box corresponding to the whole 4quadrant box -->

 <div @click="dataCollectionMode=true"  class="flexct">

     <!-- a button to move the state of this component from showing just one plotbox (data collection) to showing
     the 4 quadrant box (data visualization) -->

    <button margin-bottom="10%" v-if="currentlyActiveQuadrant!=''" @click="unselectQuadrant"> Take me back </button>

     <!-- row flex first row of the 4quadrant box -->

   <div  class="flexr">

       <!-- a colorful box component for each quadrant within the row --> 

        <colorful-box-2 :quadrantData="quadrants.one" >

            <!-- slot component holding text label for the box; animate on click (move or disappear) -->

            <text-element :variableAndQuadrantData="prepareQuadrantDataForTextElement('one',true)" />
            <text-element :variableAndQuadrantData="prepareQuadrantDataForTextElement('one',false)" y="40%"/>   

        </colorful-box-2>

        <colorful-box-2  :quadrantData="quadrants.two"  >
            <text-element :variableAndQuadrantData="prepareQuadrantDataForTextElement('two',true)" />
            <text-element :variableAndQuadrantData="prepareQuadrantDataForTextElement('two',false)" y="40%"/>   
        </colorful-box-2>

    </div>

     <!-- row flex second row of the 4quadrant box -->

    <div class="flexr">
        <!-- a colorful box component for each quadrant within the row --> 

        <colorful-box-2  :quadrantData="quadrants.three">
            <text-element :variableAndQuadrantData="prepareQuadrantDataForTextElement('three',true)" />
            <text-element :variableAndQuadrantData="prepareQuadrantDataForTextElement('three',false)" y="40%"/>
        </colorful-box-2>           
        <colorful-box-2 :quadrantData="quadrants.four"  >
            <text-element :variableAndQuadrantData="prepareQuadrantDataForTextElement('four',true)" />
            <text-element :variableAndQuadrantData="prepareQuadrantDataForTextElement('four',false)" y="40%"/>   
        </colorful-box-2>
    </div>
    <transition enter-active-class="animate__animated animate__fadeIn" >
        <!-- div enters data collection mode; at this point -->
      <plot-box v-if="currentlyActiveQuadrant!='none'" />
    
    </transition>
</div>


</template>

<script>
// import Animator from '@/services/animation.service.js'
import TextElement from './TextElement.vue'
import ColorfulBox2 from './ColorfulBox2.vue'
import PlotBox from './PlotBox.vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
export default {
    name: 'PlotGrid4',
    components: {ColorfulBox2,TextElement, PlotBox},

    setup(){
        const store = useStore()
        const quadrants = store.getters['plotPage/organizeColorsByQuadrant'];
        const currentlyActiveQuadrant = ref(store.state.plotPage.activeQuadrant);


        // watch(currentlyActiveQuadrant, (newValue) => {
        //     if (newValue!="") {
        //         console.log(newValue)
        //         quadrants = store.getters['plotPage/organizeColorsByQuadrant'];
        //     }
        // })

        function prepareQuadrantDataForTextElement(number, horizontal){
            if (horizontal === true){
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


//graveyard
        // const getOutTheWay = computed( () => {
        //     var moveIt = false;
        //     if ( store.state.plotPage. != ""){
        //         moveIt=true;
        //     }
        //     return moveIt
        // })
        // function unselectQuadrant(){
        //     this.$store.commit('currentMoodColors/unselectQuadrant')
        //     this.$store.commit('currentMoodColors/showQuadrants')
        // }
    // v-make-room-for-panel="getOutTheWay" :watch="getOutTheWay"
    // directives: {
    //     makeRoomForPanel:{
    //         updated: (el,binding) => {
    //             Animator.moveGridAside(el,binding.value)
    //         }
    //     }        
    // }
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