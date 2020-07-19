<template>
  <h2>Autorização: {{authv}} </h2>
</template>

<script>
import auth from '../services/auth'
export default {
    data(){
        return {
            authv: false
        }
    },
    methods:{
        authVer(){
            auth.authVerification().then(res => {

               return this.authv = res.data

            }).catch(error => {

               return this.authv = error.response.data

            });
            
        }
    },
    created(){

        this.authVer();
    }
}
</script>

<style>

</style>