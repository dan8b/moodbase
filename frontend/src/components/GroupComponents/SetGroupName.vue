<template>
<div >
    <Form :validation-schema="groupNameSchema" id="GroupNameForm" @submit="validateGroupName">
        <label  for="groupName">What's your group called? </label>
        <Field  name="groupName" type="text" /><br><br>
        <button  class="button2"  type="submit">Make my group!</button>
    </Form>

</div>
</template>

<script>
import { useStore } from 'vuex'
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
export default {
  name: 'SetGroupName',
  components: {
    Form,
    Field
  },
  setup () {
    const store = useStore()
    function validateGroupName (GroupNameForm) {
      store.commit('groupCreator/setName', GroupNameForm.groupName)
    }
    const groupNameSchema = yup.object().shape({
      groupName: yup
        .string()
        .required('Username is required!')
        .min(3, 'Must be at least 3 characters!')
        .max(20, 'Must be maximum 20 characters!')
    })
    return { groupNameSchema, validateGroupName }
  }
}
</script>

<style>
.field{
  border: 2px solid black;
  border-radius: 4px;
}
</style>
