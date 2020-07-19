<template>
<div>
  <div class="dash">
    <h2>Dashboard | User</h2>
    <div class="dashMenu">
      <ul>
        <li><router-link to="/dashboard/inicio">Inicio</router-link></li>
        <li><router-link to="/dashboard/meusdados">Meus Dados</router-link></li>
        <li><router-link to="/dashboard/seguranca">Segurança</router-link></li>
        <li><router-link to="/dashboard/premios">Ganhos e Premiações</router-link></li>
        <li><router-link to="/dashboard/rts">Questões e RTs</router-link></li>
        <li><router-link to="/logout">Sair (Logout)</router-link></li>
      </ul>
    </div>

    <div class="dashPainel">
      <painel v-if="$route.params.link==='inicio'" />
      <dados v-if="this.$route.params.link==='meusdados'" />
      <seguranca v-if="this.$route.params.link==='seguranca'" />
      <ganhosepremios v-if="this.$route.params.link==='premios'" />
    </div>
  </div>
  
</div>
  
</template>

<script>
import painel from './painel'
import dados from './Meusdados'
import seguranca from './Seguranca'
import ganhosepremios from './GanhosePremios'

export default {
  components:{
    painel,
    dados,
    seguranca,
    ganhosepremios
  }
}
</script>

<style>

</style>