<template>
        <Form :validation-schema="schema" id="ResetPassword" @submit="resetPassword">
        <br>
        <label for="password">Your new password </label>
        <Field class="field" name="password" type="text" /><br><br>
        </Form>
        
</template>

<script>
import { Form, Field } from "vee-validate";
import * as yup from "yup";
export default {
    name:'ResetPasswordForm',
    components: {
    Form,
    Field,
  },
  props: {
    token:String,
  },

  data(){
      const schema = yup.object().shape({
        password: yup.string().required("Password is required!").min(6,"must be at least 6 characters"),
      })
      return {schema}
  },
   
  methods:{
      resetPassword(e){
        const checkToken=this.$route.params.token
        e['token']=checkToken
        console.log(fetch('http://localhost:5000/api/resetpassword' ,{
            method: 'POST',
            mode: 'cors',
            credentials:'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(e)
        }))

    }
  }
}
</script>

<style>

</style>