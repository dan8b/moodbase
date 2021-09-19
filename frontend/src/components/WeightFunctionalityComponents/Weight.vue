<template>
<div class="bg-black hover:bg-red-700 text-white text-xl px-4 py-8  border rounded-full">
  <button @mousedown="startTime" @mouseup="endTime">
     {{buttonName}} : {{buttonValue}}
  </button>
</div>
</template>

<script>
export default {
    name:'Weight',
    props: {
        buttonName: String,
        buttonValue: Number,
        userId:Number,
    },

}
</script>

<style>

</style>