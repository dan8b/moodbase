<template>
      <Form :validation-schema="schema" id="ForgotPasswordEmail" @submit="submitResetRequest">
        <br>
        <label for="email">Your email address </label>
        <Field name="email" type="text" /><br><br>
    </Form>
</template>

<script>
import { Form, Field } from "vee-validate";
import * as yup from "yup";
export default {
name:'ForgotPasswordEmail',
  components: {
    Form,
    Field,
  },
   data() {
    const schema = yup.object().shape({
            email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
    });
    return { schema }
  },
  methods: {
    submitResetRequest(e){
      fetch('http://localhost:5000/api/sendresetemail' ,{
            method: 'POST',
            mode: 'cors',
            credentials:'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(e)
        })
    }
  }
}
</script>

<style>

</style>