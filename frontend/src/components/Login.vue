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
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/home");
    }
  },
  methods: {
    handleLogin(user) {
      // this.$store.state.auth.status.loggedIn
      this.loading = true;
      this.message = "";
      this.successful = false;
      this.$store.dispatch("auth/login", user)
      .then( response => {
        if (response.ok) {
        this.$router.push('/home')
        }
        else{
          alert("Username or password is incorrect")
        }
      }
      )

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