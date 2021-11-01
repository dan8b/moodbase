<template>
<div class="flex flex-col">
    <Form class="text-2xl flex flex-row h-min gap-x-2 w-max justify-center" :validation-schema="schema" id="LoginForm" @submit="handleLogin">
        <br>
        <label for="groupName"> Group name: </label>
        <Field class="field h-8" name="username" type="text" /><br><br>
        <label for="memberName"> Add a member (email): </label>
        <Field class="field h-8" name="memberName" type="text" /><br><br>

        <button class="rounded-b-md h-8 px-2 font-bold" type="submit">Continue</button>

    </Form>

</div>
</template>

<script>
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
export default {
  name: 'SetNameAndMembers',
  components: {
    Form,
    Field
  },

  computed: {

  },
  created () {

  },
  methods: {

  },
  setup () {
    const schema = yup.object().shape({
      groupName: yup.string().required('Group name is required!'),
      memberName: yup.string().email('Email is invalid!')
    })
    return { schema }
  }
}
</script>

<style>
.field{
  border: 2px solid black;
  border-radius: 4px;
}
</style>
