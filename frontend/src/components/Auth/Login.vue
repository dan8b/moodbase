<template>
<div class="flex flex-col">
    <Form class="text-2xl flex flex-row h-min gap-x-2 w-max justify-center" :validation-schema="schema" id="LoginForm" @submit="handleLogin">
        <br>
        <label for="username">username </label>
        <Field class="field h-8" name="username" type="text" /><br><br>
        <label for="password">password </label>
        <Field class="field h-8" name="password" type="password" /><br><br>
        <button class="rounded-b-md h-8 px-2 font-bold" type="submit">Log me in!</button>
    
    </Form>
                <router-link class="bg-blue-200 w-max px-4 py-2 mt-8 text-2xl" to="/forgot">Click here if you forgot your password </router-link>


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
          console.log("here")
          await this.$store.dispatch('userData/retrieveClickData')
          await this.$store.dispatch('communityData/communityClickData')
          await this.$store.dispatch('currentMoodColors/createInitialState')
          await this.$store.dispatch('currentMoodColors/getListOfChoices')
          await this.$store.dispatch('butts/createButts')
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