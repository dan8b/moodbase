<template>
<div class="grid grid-cols-5 gap-y-10 ">

  <ul v-for="(buttValue, buttName) in loadButts" :key="buttName">
      <Weight @mousedown="getStartTime($event,buttValue,buttName)" @contextmenu.prevent 
      @mouseup="updateWeight(buttValue,buttName)" :buttonName=buttName  :buttonValue=buttValue />
  </ul>

</div>
<br>
    <Form v-if="numButts<10" :rules="newButtonRules" id="NewButton" @submit="createNewWeight">
        <label for="newbutton"> What is weighing on you? </label>
        <Field class="field" name="name" type="text" /><br><br>
        <button class="border-solid border-black border-2" type="submit"> Create button </button>
        <ErrorMessage name="Butt" />
    </Form>


</template>

<script>
import Weight from '@/components/WeightFunctionalityComponents/Weight.vue'
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
    name:'Weights',
    components:{
        Form,
        Field,
        Weight,
        ErrorMessage,
        },
    data () {
        return {
            newButtonRules:yup.string().required("Give your weight a name!"),
            start:0,
            interval:null,
        }
    },
    computed: {
        numButts() {
            return this.$store.state.butts.numButts
        },
        loadButts(){
            return this.$store.state.butts.myButts;
        }

    },
    methods: {
        getStartTime(e,buttVal,buttName) {
            this.$store.commit('butts/incrementButt',{initialValue:buttVal,name:buttName,type:e.button})
        },
        updateWeight(buttVal,buttName) {
            this.$store.commit('butts/wipeButts',{value:buttVal,name:buttName})
        }
    },
    // setup() {
    //     const newButtonRules= yup.string().required("Give your weight a name!")

    //     const weightButtons=reactive( []);
    //     WeightFunctions.get('allot/retrieveweightdata')
    //     .then(res=>res.json())
    //     .then(data => {
    //         for (let [key,value] of Object.entries(data)){
    //             weightButtons.push(reactive({'name':key,'value':value}))
    //             }
    //         }
    //         )
        
        
    //     function createNewWeight(NewButton){
    //         if (NewButton.name in weightButtons === false){
    //             console.log("Here")
    //         }
    //         weightButtons.push(reactive({'name':NewButton.name,'value':0}))
    //         // WeightFunctions.post(null,'allot/createnewbutton/'+NewButton.name)
    //     }
    //     return {weightButtons, newButtonRules,createNewWeight}
    // }
    }
</script>

<style>

</style>