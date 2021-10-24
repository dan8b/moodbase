<template>


<div>asdfg</div>
</template>

<script>
// import {gsap} from 'gsap'
// import Test from './Test.vue'
export default {
  name:'CreateGroupForm',
  components: {},

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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes slidein {
  from {
    transform:opacity(100%);
  }
  to {
    transform:opacity(0%);
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
