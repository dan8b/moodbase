<template>
<div class="flex flex-row space-x-4">

  <ul v-for="(weight, name) in weightButtons" :key="name">
      <Weight @mousedown="getStartTime($event,weight)" @contextmenu.prevent @mouseup="updateWeight(weight)" :buttonName=weight.name  :buttonValue=weight.value />
  </ul>


</div>


</template>

<script>
import WeightFunctions from '@/services/weight.functions.js'
import Weight from '@/components/WeightFunctionalityComponents/Weight.vue'
import { reactive } from 'vue'
export default {
    name:'Weights',
    components:{Weight},
    data () {
        return {
            start:0,
            interval:null
        }
    },
    methods: {
        getStartTime(e,weight) {
            this.start=weight.value
            if (e.button===0){ this.interval=window.setInterval(function() {weight.value+=1},1000) }
            else { this.interval=window.setInterval(function() {weight.value-=1},1000) }
        },
        updateWeight(weight) {
            window.clearInterval(this.interval)
            WeightFunctions.post({delta:(weight.value-this.start),name:weight.name,value:weight.value},'allot/updateweightdata')
        }
    },
    setup() {
        const weightButtons=reactive( [] );
        WeightFunctions.get('allot/retrieveweightdata')
        .then(res=>res.json())
        .then(data => {
            for (let [key,value] of Object.entries(data)){
                weightButtons.push(reactive({'name':key,'value':value}))
                }
            })
        return {weightButtons}
       }
    }
</script>

<style>

</style>