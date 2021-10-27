<template>
 <h1 >Hello, and welcome to the moodbase! </h1>
<div>
 <h2 > Confused? Check out the documentation.</h2>


<h2> <span> <router-link to="/register"> Sign up</router-link> </span> to start showing and sharing how you feel.  </h2> 

 <h2> Or, <span> <router-link to="/login"> Sign in</router-link> </span> to record your mood! </h2>
</div>
</template>


<script>
export default {
    name: "PublicHome",
}
</script>

<style scoped>

span {
  font-size:140%;
}

.s1 {
  margin-right:60%;
}
h1 {
  font-size:400%;
}

h2 {
  font-size:333%;
}
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