<template>
<div>
    <h1 class="text-2xl">Sign up below with an email address, username and password. Password must be at least 6 characters.</h1>
    <Form :validation-schema="schema" id="RegistrationForm" @submit="handleRegistration">
        <br>
        <label for="username">username</label>
        <Field class="field" name="username" type="text"/><br><br>
        <label for="email">email </label>
        <Field class="field" name="email" type="text" /><br><br>
        <label for="password">password </label>
        <Field class="field" name="password" type="text" /><br><br>
        <button type="submit">Submit</button>
    </Form>
    <div v-if="message">Account created successfully</div>
</div>   
</template>

<script>

import { Form, Field } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Register",
  components: {
    Form,
    Field,
  },
  data() {
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
    });

    return {
      successful: false,
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
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/home");
    }
  },
  methods: {
    handleRegistration(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      this.$store.dispatch("auth/register", user).then(
        (response) => {
          this.message = response.message;
          this.successful = true;
          this.loading = false;
          this.$router.push("/login");
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        }
      );
    },
  },
};

</script>

<style>

</style>