<template>
  <div id="app">
    <div class="topo">
      <div class="logo1"><img src="/static/images/logo3.png" alt="logo1" width="129px" height="29px">Leia, responda, divirta-se e ganhe!</div>
      <div class="login"><router-link to="/">INICIO</router-link> | 
      <span v-if="!login">
        <router-link to="/login">LOGIN</router-link> | <router-link to="/cadastro">CADASTRE-SE</router-link> | 
      </span>
      <span v-else> <router-link to="/dashboard/inicio">{{nomeUser}}</router-link> | <router-link to="/logout" >LOGOUT | </router-link></span>
      <router-link to="/ajuda"> AJUDA</router-link>
      </div>
    </div>
    <router-view/>
    <div class="rodape">
      <p>RTChamp | Todos os direitos reservados. | 2020</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      login: false,
      nomeUser: null
    }
  },
  methods:{
    verificaAuth(){
      const verificaLogin = localStorage.getItem('access_token')

      if(verificaLogin){
        var u = JSON.parse(localStorage.getItem('_user'))
        this.nomeUser = u.nome
        return this.login = true
      }else{
        return this.login = false
      }
    }
  },
  created(){
    this.verificaAuth()
  }
  
}
</script>

<style>

</style>
