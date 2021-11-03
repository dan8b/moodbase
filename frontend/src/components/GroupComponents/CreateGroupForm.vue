<template>
<set-group-name v-if='currentPhase === 0' />
<set-group-members v-if='currentPhase === 1' />
<set-group-colors v-if='currentPhase === 2' />
</template>

<script>
import SetGroupName from './SetGroupName.vue'
import SetGroupMembers from './SetGroupMembers.vue'
import SetGroupColors from './SetGroupColors.vue'
export default {
  name: 'CreateGroupForm',
  components: {
    SetGroupName,
    SetGroupMembers,
    SetGroupColors
  },
  computed: {
    currentPhase () {
      return this.$store.state.groupCreator.phaseOfCreation
    }
  }
}
</script>

<style scoped>

</style>
