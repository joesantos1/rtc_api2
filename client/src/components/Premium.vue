<template>
<div>
    <div class="boxGeral"> 
        <!-- MENU ************* -->
        <MENU />
        <!-- FIM DO MENU ****** -->
        <div class="boxcontent">
        <div class="boxcontent-child">
      <h2>Campeonatos Premium</h2>
  <h4>Mais informações sobre campeonatos Premium em breve. Aguarde.</h4>
        </div>
        </div>
    </div>
    <!-- RANKING PADRAO TELA INICIAL -->
    <RANK />
</div>

</template>

<script>
import RANK from './rank.vue'
import MENU from './Menu.vue'
export default {
    components: {
        RANK,
        MENU
    },

}
</script>

<style>

</style>