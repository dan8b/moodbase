<template >

 <div class="flexc">
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
</div>

</template>

<script>
import TextElement from './TextElement.vue'
import ColorfulBox2 from './ColorfulBox2.vue'
export default {
    name: 'PlotGrid4',
    components: {ColorfulBox2,TextElement},
    data() {
        return {
            showGrid:true,
            fill:"none"
        }
    },
    computed: {
        quadrants() {
            return this.$store.state.currentMoodColors.quadrants
        }
    },
     beforeCreate() {
         this.$store.commit('currentMoodColors/initializeGridState')
     },

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