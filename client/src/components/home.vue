<template>
<div>
    <div class="boxGeral">
 <!-- MENU ************* -->
        <MENU />
        <!-- FIM DO MENU ************** -->
    
    <div class="boxcontent">
        <div class="boxcontent-child">
        <p>Selecione um livro:</p>
        
        <div class="livros" v-for="value of listAllBooks.lista2" :key="value.idb">
            <div class="position">{{value.position}}</div> 
            <router-link v-bind:to="'/bookinfor/' + value.idBook">
            <img v-bind:src="'/static/images/capas/' + value.capa" alt="capa">
            </router-link>
            <div class="infor">
                <router-link v-bind:to="'/bookinfor/' + value.idBook">
                <p>{{value.titulo}}</p>
                </router-link>
                <p style="font-size: 12px;font-style: italic;">Autor: {{value.autor}}</p>
                <p><b>{{value.totalRt}}</b> RTs realizados</p>
                
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
import Inicio from '../services/home'
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
        Inicio.listarHome().then(res => {
            this.listAllBooks = res.data
        })
    }
}
</script>
<style scoped>

</style>