<template>
  
</template>

<script>
export default {
  methods:{
    
  },
  beforeCreate(){
   function logoutUser(){
      localStorage.removeItem('access_token');
      localStorage.removeItem('nome_user')
      return location.replace('/')
    }
    this.logoutUser()
  }
}
</script>

<style>

</style>