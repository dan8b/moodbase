<template>
<div >
    <Form :validation-schema="schema" id="LoginForm" @submit="handleLogin">
        <br>

        <label for="username">username </label>
        <Field  name="username" type="text" /><br><br>
        <label for="password">password </label>
        <Field  name="password" type="password" /><br><br>
        <button  class="button2"  type="submit">Log me in!</button>

    </Form>
    <br>
      <button class="button2"> <router-link to="/forgot"> Click on me if you forgot your password </router-link> </button>

</div>
</template>

<script>
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
export default {
  name: 'Login',
  components: {
    Form,
    Field
  },

  computed: {
    loggedIn () {
      return this.$store.state.auth.loggedIn
    }
  },
  created () {
    if (this.loggedIn) {
      this.$router.push('/home')
    }
  },
  methods: {
    handleLogin (loginForm) {
      return this.$store.dispatch('auth/login', loginForm)
        .then(
          async response => {
            if (Object.keys(response)[0] === 'access_token') {
              await this.$store.dispatch('userData/retrieveClickData')
              await this.$store.dispatch('communityData/communityClickData')
              await this.$store.dispatch('butts/createButts')
              this.$router.push('/home')
            } else {
              alert(new Error('Login failed'))
            }
          })
    }
  },
  setup () {
    const schema = yup.object().shape({
      username: yup.string().required('Username is required!'),
      password: yup.string().required('Password is required!')
    })
    return { schema }
  }
}
</script>

<style scoped>
.button2{
  display:inline-block;
  padding:0.5em 3em;
  border:0.16em solid #FFFFFF;
  margin:0 0.3em 0.3em 0;
  box-sizing: border-box;
  text-decoration:none;
  /* text-transform:uppercase; */
  font-family:'Roboto',sans-serif;
  font-weight:400;
  color:black;
  text-align:center;
  transition: all 0.15s;
}
.button2:hover{
  /* color:#DDDDDD; */
  border-color:#DDDDDD;
}
.button2:active{
  color:#BBBBBB;
  border-color:#BBBBBB;
}

label {
  font-size:150%;
}

.field {
  width:30%;
  border: 2px solid black;
  border-radius: 7%;
}
</style>
