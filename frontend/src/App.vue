<template>
  <div id="nav">
  
  <ul v-if="checkLogin" class="flex">
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
      <router-link to="/groups">Groups</router-link>
  </li>
  <li class="mr-6">
    <a id="logoutButton" @click="logout">Logout</a>
  </li>  
  </ul>



  <br>
    <router-view :key="$route.fullPath"></router-view>
</div>

  
</template>

<script>
// import {mapActions} from 'vuex'
export default {
 
  computed: { 
    checkLogin() {
      return this.$store.state.auth.loggedIn;
      },

  },

methods:{ 
  logout() { 
    this.$store.commit('currentMoodColors/wipeColorState')
    this.$store.commit('userData/wipeDataState')
    this.$store.dispatch('auth/logout');
    this.$router.push('/');
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
