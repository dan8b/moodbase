<template>
   
<div>
   <ul class="navbar" v-if="checkLogin" >
    <li >
        <router-link to="/home">Home</router-link> 
    </li>
    <li >
      <router-link to="/plot">Plot</router-link> 
    </li>
    <li>
      <router-link to="/allot">Allot</router-link>
    </li>
    <li >
      <router-link to="/groups">Groups</router-link>
    </li>
    <li >
      <a id="logoutButton" @click="logout">Logout</a>
    </li>  

  </ul>


  <br>
  <br>

  <br>
    <router-view :key="$route.fullPath"></router-view>

</div> 
</template>

<script>
// import {mapActions} from 'vuex'
export default {
  data() {
    return {
      hide:false
    }
  },

  computed: { 
    checkLogin() {
      return this.$store.state.auth.loggedIn;
      },

  },

methods:{ 
  toggleHide() {
      this.hide=!this.hide;
    },
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

.navbar {
  position:fixed;
  display:flex;
  padding-left:25%;
  padding-top:0%;
  margin-bottom:5%;
  width:80%;
  font-size:x-large;
  font-weight: bold;
  color: #2c3e50;
}

li {
  list-style-type:none;
  margin-left:5%;
}

a:visited{
  color:black;
}

a {
    text-decoration:none;
    cursor:pointer;
}
ul a:hover{
  color:#42b983
}

ul a.router-link-exact-active {
  text-decoration:none;
  color: #42b983;
}

.flexc{
  display:flex;
  margin:0;
  padding:0;
  flex-direction:column;
}

.flexr{
  display:flex;
  margin:0;
  padding:0;
  flex-direction:row;
}

</style>
