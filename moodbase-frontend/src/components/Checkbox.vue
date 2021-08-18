<template>
  <div>
  <input type="checkbox" @change="shownStatus" :id="id" :value="value" />
  <label :for="labelVal">{{labelVal}}</label>
    </div>
</template>

<script>
export default {
    name: 'Checkbox',
    props: {
        id: String,
        value: String,
        labelVal: String,
    },
    methods: {
        shownStatus(e){
            var toShow=e.target.checked;
            var varName=e.target.value
            this.$store.commit('visToShow/showOrHide',{name:varName,showOrHide:toShow})
        }
    },
    setup() {
        
    }

}
</script>

<style>

</style>