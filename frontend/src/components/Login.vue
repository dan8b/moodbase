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
      .then( () => 
        (response) => {
          this.message = response.message;
          this.successful = true;
          this.loading = false;
          this.$router.push('/home')
        },
        (error) => {
          console.log(error)
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
          alert(this.message)
        }
        

        )
        // () =>  {
        //   this.$router.push("/home");
        // },
 
    },
  },
};
</script>

<style>
.field{
  border: 2px solid black;
  border-radius: 4px;
}
</style>