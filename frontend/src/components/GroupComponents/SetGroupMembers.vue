<template>
<div >
    <Form :validation-schema="memberSchema" id="MembershipForm" @submit="validateMember">
        <label  for="memberEmail">Who's in your group? </label>
        <Field  name="memberEmail" type="email" /><br><br>
        <button type="submit">Add this person to my group!</button>
    </Form>
      <ul  v-for="(name, i) in currentList" :key="i">
        <li> {{ name }} </li>
      </ul>
      <button @click='nextPhase' v-if='currentList.length > 0'> Yes, add these people to my group! </button>
</div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
export default {
  name: 'SetGroupMembers',
  components: {
    Form,
    Field
  },
  setup () {
    const store = useStore()
    function validateMember (MembershipForm) {
      store.commit('groupCreator/addMember', MembershipForm.memberEmail)
    }
    function nextPhase () {
      store.commit('groupCreator/confirmMembers')
    }
    const currentList = computed(() => {
      return store.state.groupCreator.formData.groupMembers
    })
    const memberSchema = yup.object().shape({
      memberEmail: yup
        .string()
        .required('Email is required!')
        .email('Email is invalid!')
        .max(30, 'Must be maximum 30 characters!')
    })
    return { memberSchema, validateMember, currentList, nextPhase }
  }
}
</script>

<style>
.field{
  border: 2px solid black;
  border-radius: 4px;
}
</style>
