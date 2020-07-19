<template>
  <div>
    <div class="boxGeral">
 <!-- MENU ************* -->
        <MENU />
        <!-- FIM DO MENU ************** -->
    
    <div class="boxcontent">
        <div class="boxcontent-child">
            <h3><router-link :to="'/bookcommunity/' + idbook">Voltar</router-link> | Comunidade | {{topicTitulo}}</h3>

            <div class="errors" v-if="listaError" @click="listaError=false">{{listaError}}</div>
            <div class="sucessos" v-if="confirmaUpd" @click="confirmaUpd=false">{{confirmaUpd}}</div>
            
            <h2>{{topicTitulo}}</h2>

            <div class="topic-msgs" v-if="listAllmsg">
                <ul>
                    <li v-for="listAll of listAllmsg" :key="listAll.id"><b>{{listAll.autor}}</b>:
                        <ul>
                            <li>{{listAll.msg}}</li>
                            <li style="font-size: 11px;"><i>{{formatData(listAll.dataMsg)}}</i> | <likesandcompla :lc="{
                                likes: listAll.likes,
                                denuncias: listAll.denuncias,
                                catid: listAll.catid,
                                cat: 'communit_msgs',
                                ulikes: listAll.likes_user,
                                ucompl: listAll.denuncias_user
                                }" /> | <button>Responder</button></li>
                        </ul>
                    </li>    
                </ul>
            </div>
          
            <form @submit.prevent="enviaMsg">
                <textarea name="newmsg" id="" cols="100" rows="3" v-model="df.newmsg" placeholder="Digite sua mensagem"></textarea>
                <p><button type="submit">Enviar</button> | <button @click="df.newmsg=null">Apagar</button></p>
            </form>
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
            listAllmsg: [],
            listaError: false,
            df: {
                newmsg: null,
                topic: this.$route.params.id,
                resp: null
            },
            newMsgData: null,
            topicTitulo: null,
            confirmaUpd: false,
            btl: '',
            idbook: ''
        }
    },

    mounted(){
        
        Comunit.listarTopicMsgs(this.$route.params.id).then(res => {
            this.listAllmsg = res.data.tm
            this.topicTitulo = res.data.topic
            this.idbook = res.data.idbook

        }).catch(error => {
            this.listaError = '[x] Algo deu errado. Por favor, volte mais tarde.'
        })
    },

    methods: {
        formatData(data){

            var d = data.split('T')
            var d1 = d[0].split('-')

            var h1 = d[1].split(':')

            var ha = h1[0] >= 3 ? h1[0] - 3 : parseInt(h1[0]) + 24 - 3

            var r = d1[2] + '/' + d1[1] + '/' + d1[0] + ' ' + ha + 'h' + h1[1]

            return r;
        },
        enviaMsg(){

            if(this.df.newmsg == null){
                return this.listaError = 'Por favor, digite uma mensagem.'
            }

            Comunit.enviaNovaMsg(this.df).then(res => {
                this.confirmaUpd = 'Mensagem enviada com sucesso!'
                this.idmsg = res.data.idmsg
                this.df.newmsg = null
                this.$router.go()
            }).catch(error => {

                console.log(error);
                return 
            })

            var data = new Date();

            this.newcriador = localStorage.getItem('nick_user')
            this.newMsgData = data.getDate() + '/' + data.getMonth() + '/' + data.getFullYear() + ' ' + data.getHours() + ':' + data.getMinutes()
            this.newlikes = 0
        },

    },
    watch: {
        $route(to, from){
            Comunit.listarTopicMsgs(this.$route.params.id).then(res => {
            this.listAllmsg = res.data.tm
            this.topicTitulo = res.data.topic

        }).catch(error => {
            this.listaError = '[x] Algo deu errado. Por favor, volte mais tarde.'
        })
        }
    }
}
</script>

<style>

</style>