<template>
  <button @click="testfast">test fast</button>
  <div id="nav">

  <ul v-if="currentUser" class="flex">
    <li class="mr-6">
    <router-link to="/home">Home</router-link> 
  </li>
  <li  class="mr-6">
    <router-link to="/plot">Plot</router-link> 
  </li>
  <li class="mr-6">
      <router-link to="/allot">Allot</router-link>
  </li>
  <li class="mr-6">
    <a id="logoutButton" @click="logOut">Logout</a>
  </li>  
  </ul>
      <ul v-else class="flex">
  <li class="mr-6">
    <router-link to="/login">Login</router-link> 
  </li>
  <li class="mr-6">
    <router-link to="/register">Register</router-link> 
  </li>
    </ul>

  <br>
    <router-view />
</div>

  
</template>

<script>

export default {
  computed: { 
    currentUser() {
      return this.$store.state.auth.user;
      }
  },

methods:{ 
  testfast(){
    console.log(fetch('http://localhost:8000/api/testrequest'))
  },
  logOut() {
      const currentUser=this.$store.state.auth.user
      this.$store.commit('currentMoodColors/wipeColorState')
      this.$store.dispatch('auth/logout',currentUser);
      this.$router.push('/login');
    // }
    }
}

}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
