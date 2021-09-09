<template>

<div class="w-max flex flex-col">
  <div> <ColorPickerButton/> </div>

</div>
</template>

<script>
import ColorPickerButton from './ColorPickerButton.vue'
export default {
    name: 'PlotColorPicker',
    components: {
      ColorPickerButton
    },
    computed:{
      classVar() {
            return { '--color':this.boxColor}
        },


    },
    methods: {
    },

}
</script>

<style scoped>
#nameBox{
  width:80px;
}
#colorbox{
    display:flex;
    justify-content:center;
    width:80px;
    background-color:var(--color);
}


</style>