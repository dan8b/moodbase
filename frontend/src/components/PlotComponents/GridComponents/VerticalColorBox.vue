<template>

    <div :style="verticalBox" />


</template>

<script>
export default {
    name:'VerticalColorBox',
    props: {
        direction: {
            type:String,
            required:true,
        },
        color: {
            type:String,
            required:true,
        }
    },

    computed: {
        verticalBox() {
            return {
        '--background':"linear-gradient(to "+this.direction+this.color+",transparent)",
        '--background-blend-mode':'screen'
            }
        }
    }
}
</script>

<style>
div {
  position:absolute;
  width:100%;
  height:100%;
  background: var(--background);
  background-blend-mode: var(--background-blend-mode);
  }

</style>