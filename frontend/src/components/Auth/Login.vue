<template>
<div>
    <Form :validation-schema="schema" id="LoginForm" @submit="handleLogin">
        <br>
        <label for="username">username </label>
        <Field class="field" name="username" type="text" /><br><br>
        <label for="password">password </label>
        <Field class="field" name="password" type="text" /><br><br>
        <button type="submit">Submit</button>
        
    </Form>
    <router-link to="/forgot">Forgot my password</router-link>
</div>
</template>

<script>
import { Form, Field } from "vee-validate";
import * as yup from "yup";
export default {
  name: "Login",
  components: {
    Form,
    Field,
  },

  computed: {
    loggedIn() {
      return this.$store.state.auth.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/home");
    }
  },
  methods: {
    handleLogin(loginForm) {
      return this.$store.dispatch("auth/login",loginForm)
      .then(
        async response =>{
        if (Object.keys(response)[0]==="access_token"){
          await this.$store.dispatch('userData/retrieveClickData')
          await this.$store.dispatch('communityData/communityClickData')
          await this.$store.dispatch('currentMoodColors/createInitialState')
          await this.$store.dispatch('currentMoodColors/getListOfChoices')
          this.$router.push('/home')
        }
        else {
          alert(new Error('Login failed'))
        }
        })
    }
    },
  setup() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });
    return {schema}
  }
};
</script>

<style>
.field{
  border: 2px solid black;
  border-radius: 4px;
}
</style>