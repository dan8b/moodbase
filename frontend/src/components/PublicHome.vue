<template>
  <div>Hi
  </div>
</template>

<script>
export default {
    name: "PublicHome",

    created() {
      if (this.$route.params!=={}) { 
        this.$router.push({
          name: 'ResetPasswordPage',
          params: {token: this.$route.params.token}}
        )
        }
}
}
</script>

<style>

</style>