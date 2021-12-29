<template>
  <line :x1="startAt.x" :y1="startAt.y" :x2="endAt.x" :y2="endAt.y" stroke="black" />
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'LineBetweenDots',
    props: {
        vIndex: Number
    },
    computed: {
        ...mapGetters({
            pathData: 'butts/dataForDotRendering'
        }),
        startAt () {
            return this.$store.state.butts.pathByVariable[this.vIndex]
        },
        endAt () {
            if (this.vIndex === this.pathData.numPoints) {
                return this.$store.state.butts.pathByVariable[this.pathData.buttNames[-1]]
            } else {
                return this.$store.state.butts.pathByVariable[this.pathData.buttNames[this.vIndex + 1]]
            }
        }
    }
}
</script>

<style>

</style>
