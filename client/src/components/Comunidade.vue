<template>
<div>
    <div class="boxGeral">
 <!-- MENU ************* -->
        <MENU />
        <!-- FIM DO MENU ************** -->
    
    <div class="boxcontent">
        <div class="boxcontent-child">
        <h3>Comunidade | Ordem: Maiores comunidades | Acesse sua comunidade:</h3>
        
        <div class="livros" v-for="value of listAllBooks.lista2" :key="value.idb">
            <div class="position">{{value.position}}</div> 
            <router-link v-bind:to="'/bookcommunity/' + value.idBook">
            <img v-bind:src="'/static/images/capas/' + value.capa" alt="capa">
            </router-link>
            <div class="infor">
                <router-link v-bind:to="'/bookcommunity/' + value.idBook">
                <p>{{value.titulo}} | <span style="font-size: 12px;font-style: italic;">{{value.autor}}</span></p>
                </router-link>
                <p><b>{{value.totalRt}}</b> Tópicos e Discurssões</p>
            </div>
        </div>
        </div>
    </div>
</div>

    <!-- RANKING PADRAO TELA INICIAL -->
    <RANK />
</div>

</template>
<script>
import Comunit from '../services/comunidade'
import RANK from './rank.vue'
import MENU from './Menu.vue'

export default {
    components: {
        RANK,
        MENU
    },

    data(){
        return {
            listAllBooks: []
        }
    },

    mounted(){
        Comunit.listarComunidade().then(res => {
            this.listAllBooks = res.data
        })
    }
}
</script>
<style scoped>

</style>