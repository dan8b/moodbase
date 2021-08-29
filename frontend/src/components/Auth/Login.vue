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

        <!-- <div v-if="message">
            {{ message }}
        </div> -->
</div>
</template>

<script>
import { Form, Field } from "vee-validate";
// import {authHeader} from '@/services/auth-header';
import * as yup from "yup";
export default {
  name: "Login",
  components: {
    Form,
    Field,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });

    return {
      loading: false,
      message: "",
      schema,
    };
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
      this.loading = true;
      this.message = "";
      this.successful = false;
      return this.$store.dispatch("auth/login",loginForm)
      .then(
        response =>{
        if (Object.keys(response)[0]==="access_token"){
          this.$router.push('/home')
        }
        else {
          alert(new Error(response.detail))
        }
        })
      //   })

    }
    },
};
</script>

<style>
.field{
  border: 2px solid black;
  border-radius: 4px;
}
</style>