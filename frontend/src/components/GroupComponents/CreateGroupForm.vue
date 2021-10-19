<template>
<div id="demo">
  <button @click="show1 = !show1">
    Toggle1
  </button>
  <button @click="show2 = !show2">
    Toggle2
  </button>

  <transition name="fade">
    <p v-if="show1">hello</p>
  </transition>

  <transition name="butt">
    <p v-if="show2">Goodbye </p>
  </transition>
<SetNameAndMembers />
</div>

</template>

<script>
import SetNameAndMembers from './SetNameAndMembers.vue'
export default {
  name:'CreateGroupForm',
  components: {SetNameAndMembers},
  data() {
    return {
      step:0,
      show1:true,
      show2:false
    }
  }
}
</script>

<style scoped>


body {
  margin: 30px;
}

.butt-enter-active {
    animation: slideout 0.5s;
}
.butt-leave-active {
  animation: slidein 0.5s
}

.fade-enter-active {
    animation: slideout 0.5s;
}
.fade-leave-active {
  animation: slidein 0.5s
}

@keyframes slidein {
  from {
    transform:translateX(0%);
  }
  to {
    transform:translateX(100%);
  }
}

@keyframes slideout {
  from {
    transform:translateX(-100%);
  }
  to {
    transform:translateX(0%)
  }
}
</style>
