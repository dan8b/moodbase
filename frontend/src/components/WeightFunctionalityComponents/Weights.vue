<template>
<div>

<ul id="array-with-index">
  <li v-for="(weight, name) in weightButtons" :key="name">
      <Weight @mousedown="getStartTime" @mouseup="updateWeight(weight)" :buttonName=weight.name  :buttonValue=weight.value />
  </li>
</ul>

</div>


</template>

<script>
import Weight from '@/components/WeightFunctionalityComponents/Weight.vue'
import { useStore } from 'vuex'
import { reactive } from 'vue'
export default {
    name:'Weights',
    components:{Weight},
    data () {
        return {
            start:0,
            end:0,
            delta:0
        }
    },
    methods: {
        getStartTime() {
            this.start=new Date();
        },
        updateWeight(weight) {
            this.end=new Date();
            this.delta=this.end-this.start;
            weight.value+=this.delta;
            console.log(this.uid)
            fetch('http://localhost:5000/api/fileweight', {
            method: 'POST',  
            mode: 'cors',  
            headers: { 'Content-Type': 'application/json', }, 
            body:JSON.stringify({"uid":this.uid,'updateVal':this.delta,'weight':weight.name})
        })
        },
        },
    setup() {
        const store=useStore();
        const token=store.state.auth.user.accessToken;
        const uid=store.state.auth.user.id;
        const weightButtons=reactive( [] );
        fetch('http://localhost:5000/api/weightdata', {
            method: 'POST',  
            mode: 'cors',  
            headers: { 'Authorization': 'Basic '+token, 'Content-Type': 'application/json', }, 
        body:JSON.stringify({"uid":uid},)})
        .then(res=>res.json())
        .then(data => {
            for (let weight of data){
                weightButtons.push(reactive({'name':weight.name,'value':weight.value}))
            }
         })
            return {weightButtons, uid}

       },
}
    // // },   
    // },
</script>

<style>

</style>