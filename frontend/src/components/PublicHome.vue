<template>
<body class="max-h-screen">
 <p class='text-6xl'>Hello, and welcome to the moodbase! </p>

<div class="py-8 text-4xl flex flex-col ">

 
 <div>
 <p > Confused? Check out the documentation.</p>
 </div>

 <p class="py-8"> Got the idea? <router-link to="/register"> Sign up </router-link> to start showing and sharing how you feel.  </p> 

 <p> If you've already made an account, <router-link to="/login"> sign in </router-link> to record your mood! </p>
</div>
</body>
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