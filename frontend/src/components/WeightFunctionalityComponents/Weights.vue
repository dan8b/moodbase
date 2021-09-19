<template>
<div class="grid grid-cols-5 gap-y-10 ">

  <ul v-for="(weight, i) in weightButtons" :key="i">
      <Weight @mousedown="getStartTime($event,weight)" @contextmenu.prevent 
      @mouseup="updateWeight(weight)" :buttonName=weight.name  :buttonValue=weight.value />
  </ul>

</div>
<br>
    <Form v-if="weightButtons.length<10" :rules="newButtonRules" id="NewButton" @submit="createNewWeight">
        <label for="newbutton"> What is weighing on you? </label>
        <Field class="field" name="name" type="text" /><br><br>
        <button class="border-solid border-black border-2" type="submit"> Create button </button>
        <ErrorMessage name="Butt" />
    </Form>


</template>

<script>
import WeightFunctions from '@/services/weight.functions.js'
import Weight from '@/components/WeightFunctionalityComponents/Weight.vue'
import { reactive } from 'vue'
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
    name:'Weights',
    components:{
        Form,
        Field,
        Weight,
        ErrorMessage
        },
    data () {
        return {
            start:0,
            interval:null,
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
        },
    },
    setup() {
        const newButtonRules= yup.string().required("Give your weight a name!")

        const weightButtons=reactive( [] );
        WeightFunctions.get('allot/retrieveweightdata')
        .then(res=>res.json())
        .then(data => {
            for (let [key,value] of Object.entries(data)){
                weightButtons.push(reactive({'name':key,'value':value}))
                }
            })
        
        
        function createNewWeight(NewButton){
            if (NewButton.name in weightButtons){console.log("Here")}
            weightButtons.push(reactive({'name':NewButton.name,'value':0}))
            // WeightFunctions.post(null,'allot/createnewbutton/'+NewButton.name)
        }
        return {weightButtons, newButtonRules,createNewWeight}
    }
    }
</script>

<style>

</style>