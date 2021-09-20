<template>
<div class="grid grid-cols-5 gap-y-10 ">

  <ul v-for="(buttValue, buttName) in loadButts" :key="buttName">
      <Weight @mousedown="getStartTime($event,buttValue,buttName)" @contextmenu.prevent 
      @mouseup="updateWeight(buttValue,buttName)" :buttonName=buttName  :buttonValue=buttValue />
      <button @click="deleteButt(buttName)"> remove </button>
  </ul>

</div>
<br>
    <Form v-if="numButts<10" :rules="newButtonRules" id="NewButton" @submit="createNewWeight">
        <label for="newbutton"> what's weighing on you? </label>
        <Field class="field" name="name" type="text" /><br><br>
        <button class="border-solid border-black border-2 px-4" type="submit"> create button </button>
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
        },
        createNewWeight(NewButton){
            if (this.loadButts[NewButton.name]!=null){
                alert("You've already got a button by this name")
            }
            else{
                this.$store.dispatch('butts/newButt',NewButton.name)
            }
        },
        deleteButt(toDelete){
            this.$store.dispatch('butts/deleteButt',toDelete)
        }
    },
    }
</script>

<style>

</style>