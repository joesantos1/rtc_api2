<template>
<div>
    
    <div class="boxGeral"> 

        <!-- MENU ************* -->
        <MENU />
        <!-- FIM DO MENU ************** -->
    

    <div class="boxcontent">
        <div class="boxcontent-child">
        <h3><router-link v-bind:to="'/'">Voltar</router-link> | {{booki.book_titulo}}:</h3>
        <div class="bookinfor">

            <div class="iniciar-rt">
                <p>Entrar no campeonato:</p>
                <h2><router-link v-bind:to="'/rtbook/' + booki.id">> Iniciar RT</router-link></h2>
                <p>Crie novas questões para este RT<br>e Ganhe até <b>90 RTP</b> por questão aprovada:</p>
                <h4>
                    <router-link to="/creatert">Criar uma questão</router-link>
                </h4>
                
            </div>

            <p style="color: grey;font-size: 10px;font-style:italic">Capa original:</p>
            <img v-bind:src="'/static/images/capas/' + booki.book_capa">
            Título:<br>
            <h2>{{booki.book_titulo}}</h2>
            Autor:<br>
            <h3>{{booki.book_autor}}</h3>
            <p>Total de RTs realizados: 70</p>
            <p>Avaliação dos Usuários: </p>
            <p>Adiquira este livro - Compre agora: <a v-bind:href="booki.book_link1" target="_blank">Acessar loja</a></p>
            <div class="mais-descricao">
                <h4>Sobre o Livro:</h4>
                <p>{{booki.book_descricao}}</p>
            </div>
            
        </div>
    </div>
    </div>
    </div>

<!-- RANKING PADRAO TELA INICIAL -->
<RANK v-bind:listaRank = booksinfor />

    
</div>
</template>
<script>
import MENU from './Menu.vue'
import inforBook from '../services/bookinfo'
import RANK from './rank.vue'
export default {

    components: {
        RANK,
        MENU
    },

    data(){
        return {
            booksinfor: [],
            booki: []
        }
    },

    mounted(){
         inforBook.listarInfor(this.$route.params.id).then(res => {
             console.log(res.data)
            this.booksinfor = res.data.lista1
            this.booki = res.data.lista2
        })
    }
}
</script>
<style>

</style>