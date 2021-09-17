<template>
<div class="px-64">
    <PopularColors />
    <ColorPopularityDetails />
</div>
</template>

<script>
import PopularColors from '@/components/PlotComponents/PopularColors.vue'
import ColorPopularityDetails from './ColorPopularityDetails.vue'
export default {
    name:'CommunityDataOverview',
    components: {PopularColors, ColorPopularityDetails}
}
</script>

<style>

</style>