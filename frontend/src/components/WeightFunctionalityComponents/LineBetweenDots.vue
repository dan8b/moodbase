<template>
  <line 
    :x1="coords.start.x" 
    :y1="coords.start.y" 
    :x2="coords.end.x" 
    :y2="coords.end.y" 
    stroke="black" />
</template>

<script>
export default {
    name: 'LineBetweenDots',
    props: {
        vIndex: Number,
    },
    data () {
        return {
            startAtEndAt: {}
        }
    },
    computed: {
        coords () {
            return this.$store.state.butts.pathToFrom[this.vIndex - 1]
        }
    },
    beforeCreate () {
        this.$store.commit('butts/generatePathToFrom', this.vIndex)
    },
    watch: {
        coords(n) {
            console.log(n)
        }
    }
}
</script>

<style>

</style>
