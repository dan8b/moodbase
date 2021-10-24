<template>
 <h1 >Hello, and welcome to the moodbase! </h1>

 <h2 > Confused? Check out the documentation.</h2>

 <h2> Got the idea? <router-link to="/register"> Sign up</router-link> to start showing and sharing how you feel.  </h2> 

 <h2> If you've already made an account, <router-link to="/login"> sign in</router-link> to record your mood! </h2>

</template>


<script>
export default {
    name: "PublicHome",
}
</script>

<style>
/* body, html {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
}
body {
  background-color: rgba(184, 235, 201, 0.959);
} */
</style>