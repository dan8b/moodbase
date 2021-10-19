<template>
<div>
    <h1 class="text-2xl">Sign up below with an email address, username and password. Password must be at least 6 characters.</h1>

    <Form :validation-schema="schema" id="RegistrationForm" @submit="handleRegistration">
        <br>
            <div class="flex flex-col w-max gap-6 justify-items-evenly" >
              <div class="flex flex-row space-x-4">
                <div > <label for="username">username</label> </div>
                <div ><Field class="field" name="username" type="text"/></div>
              </div>
              <div class="flex flex-row justify-center space-x-4">
                <div> <label for="email">email </label></div>
                <div><Field class="field" name="email" type="text" /></div>
              </div>
              <div class="flex flex-row justify-evenly">
                <div><label for="password">password </label></div>
                <div><Field class="field" name="password" type="password" /></div>
              </div>
              <div class="flex flex-row justify-evenly">
                <div><label for = 'confirm password'> confirm password </label></div>
                <div><Field class='field' name='confirmPassword' type='text' /> </div>
              </div>
              <button type="submit">Create my account</button>
          </div>
    </Form>

</div>   
</template>

<script>

import AuthService from '@/services/auth.service'
import { Form, Field } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Register",
  components: {
    Form,
    Field,
  },
  data() {


    return {
      successful: false,
      loading: false,
      message: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/home");
    }
  },
  methods: {
    handleRegistration(registrationForm) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      return AuthService.register(registrationForm).then(
        response => {
          console.log(response)
          if (response.status===200){
            alert("Success! You'll be getting an activation link in your email soon.")
          }
          else if (response.status!=200){
            alert("User with that username or email already exists")
          }
        })
    }
  },
  setup(){
    const schema = yup.object().shape({
      username: yup
        .string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
      confirmPasssword: yup
        .string()
        .oneOf([yup.ref('password'),null],'Password must match')
        .required('Confirm password is required')
    });
    return {schema}
  }
};

</script>

<style>

</style>