<template >
            <button v-if="isQuadrantActive!='none'" @click="unselectQuadrant"> Take me back </button>

 <div v-make-room-for-panel="getOutTheWay" :watch="getOutTheWay" class="flexct">
   <div class="flexr">
        <colorful-box-2 quadrant="one" >
            <text-element quadrantNum="one" :variable="quadrants.one.data.xVar" />
            <text-element quadrantNum="one" :variable="quadrants.one.data.yVar" y="40%"/>        
        </colorful-box-2>

        <colorful-box-2 quadrant="two"  >
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
            <text-element quadrantNum="four" :variable="quadrants.four.data.xVar" />
            <text-element quadrantNum="four" :variable="quadrants.four.data.yVar" y="40%"/>   
        </colorful-box-2>
    </div>

    <transition enter-active-class="animate__animated animate__fadeIn" >

        <plot-box v-if="isQuadrantActive!='none'" />
    </transition>
</div>


</template>

<script>
import Animator from '@/services/animation.service.js'
import PlotBox from './PlotBox.vue'
import TextElement from './TextElement.vue'
import ColorfulBox2 from './ColorfulBox2.vue'
export default {
    name: 'PlotGrid4',
    components: {ColorfulBox2,TextElement,PlotBox},
    data() {
        return {
            showGrid:true,
            fill:"none"
        }
    },
    computed: {
        getOutTheWay() {
            var moveIt=false;
            if (this.$store.state.currentMoodColors.variableSelection != ""){
                moveIt=true;
            }
            return moveIt;
        },
        quadrants() {
            return this.$store.state.currentMoodColors.quadrants
        },
        isQuadrantActive(){
            return this.$store.state.currentMoodColors.activeQuadrant
        }
    },
    beforeCreate() {
         this.$store.commit('currentMoodColors/initializeGridState')
        },
    methods:{
        unselectQuadrant(){
            this.$store.commit('currentMoodColors/unselectQuadrant')
            this.$store.commit('currentMoodColors/showQuadrants')
        }
    },
    directives: {
        makeRoomForPanel:{
            updated: (el,binding) => {
                Animator.moveGridAside(el,binding.value)
            }
        }        
    }
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