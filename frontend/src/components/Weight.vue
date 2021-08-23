<template>
  <button @mousedown="startTime" @mouseup="endTime" class="btn">{{buttonName}} : {{buttonValue}}</button>

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
.btn{
  display: inline-block;
  text-decoration: none;
  background: #87befd;
  color: #FFF;
  width: 120px;
  height: 120px;
  line-height: 120px;
  border-radius: 50%;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
  transition: .4s;
}

.btn:hover{
    background: #668ad8;
}
</style>