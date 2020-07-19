<template>
  <div>
    <div class="boxGeral">
 <!-- MENU ************* -->
        <MENU />
        <!-- FIM DO MENU ************** -->
    
    <div class="boxcontent">
        <div class="boxcontent-child">
            <h3><router-link to="/comunidade">Voltar</router-link> | Comunidade | {{book}} </h3>

            <div class="errors" v-if="listaError" @click="listaError=false">{{listaError}}</div>
            <div class="sucessos" v-if="confirmaUpd" @click="confirmaUpd=false">{{confirmaUpd}}</div>

            <form @submit.prevent="criaTopico">
                <label for="titulo">Titulo do tópico (Tema): (Ex.: Sobre o capítulo 4) <br> </label>
                <input type="text" name="titulo" id="titulo" size="100px" v-model="d.titulo">
                <p> <label for="msgs">Mensagem: </label> <br> <textarea name="msgs" id="" cols="80" rows="3" v-model="d.msgs" placeholder="Digite sua mensagem..."></textarea></p>
                
                
                <p><button type="submit">Criar novo tópico</button> | <button>Apagar</button> </p>
            </form>
        <hr>
                
                <div class="communit-topics" v-if="listAlltopics">
                    <h2>Tópicos e discurssões</h2>
                    <ul>
                        <li v-for="listAll of listAlltopics" :key="listAll.id"><router-link :to="'/community/topic/' + listAll.si"> <h3>{{listAll.stitulo}}</h3> </router-link>
                            <ul>
                                <li style="font-size:12px;">Total de discurssões: {{listAll.stotal}} | Criado por: {{listAll.scriador}} | Criado em: {{listAll.screated}} | <likesandcompla :lc="{
                                likes: listAll.likes,
                                denuncias: -1,
                                catid: listAll.si,
                                cat: 'communit_topics',
                                ulikes: listAll.likes_user,
                                ucompl: false
                                }" /></li>
                            </ul>
                        </li>
                    </ul>
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
import likesandcompla from './LikesAndCompla.vue'

export default {
    components: {
        RANK,
        MENU,
        likesandcompla
    },

    data(){
        return {
            listAlltopics: [],
            listaError: false,
            d: {
                titulo: null,
                msgs: null,
                idbook: this.$route.params.id,
                tipo: 1
            },
            topico: false,
            totalmsgs: 0,
            criador: null,
            topicoData: null,
            likes: null,
            confirmaUpd: false,
            idcommunit: false,
            book: ''
        }
    },

    mounted(){
        Comunit.listarComuniTopics(this.$route.params.id).then(res => {
            this.listAlltopics = res.data.dt
            this.book = res.data.sbook
        }).catch(error => {
            this.listaError = '[x] Não há tópicos ou discurssões sobre este livro. Seja o primeiro a criar!'
        })
    },

    methods: {
        criaTopico(){

            if(this.d.titulo == null || this.d.msgs == null){
                return this.listaError = 'Por favor, preencha todos os campos obrigatórios.'
            }

            Comunit.criaComuniTopics(this.d).then(res => {

                this.d.titulo = null
                this.d.msgs = null
                this.confirmaUpd = 'Tópico criado com sucesso!'

                this.$router.go()

            }).catch(error => {
                return location.replace('/login')
            })
        }
    },
    watch: {
        $route(to, from){
            Comunit.listarComuniTopics(this.$route.params.id).then(res => {
            this.listAlltopics = res.data.dt
            this.book = res.data.sbook
            }).catch(error => {
                this.listaError = '[x] Não há tópicos ou discurssões sobre este livro. Seja o primeiro a criar!'
            })
        }
    }
}
</script>

<style>

</style>