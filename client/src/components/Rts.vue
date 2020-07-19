<template>
<div>
    <div class="boxGeral"> 
        <!-- MENU ************* -->
        <MENU />
        <!-- FIM DO MENU ****** -->
        <div class="boxcontent">
            <div class="boxcontent-child">

                <h3><router-link to="/">Voltar</router-link> | Histórico de RTs | {{userNick}}</h3>
               <h2>(ID): {{userNick}}</h2>
               <ul>
                   <li>Nome: {{listaRts.user_nome}}</li>
                   <li>Conta verificada: </li>
                   <li>Posição atual no Ranking: {{listaRts.posRank}}º</li>
                   <li>Campeonato atual - Prêmio: R$ {{listaRts.premio}}</li>
                   <li>Total de Questões realizadas: {{listaRts.rts_total}}</li>
                   <li>Total de Questões acertadas: {{listaRts.rts_totalc}}</li>
                   <li>RTP acumulado: {{listaRts.user_total_rtp}}</li>
               </ul>
               <h4>Histórico de RTs:</h4>
               <table cellspacing="0px" id="alltb">
                   <tr>
                       <th>Questão realizada em:</th>
                       <th>Livro</th>
                       <th>RT | Questão</th>
                       <th>Tempo de resposta</th>
                       <th>RTP ganho:</th>
                   </tr>
                   <tr v-for="value of listaRts.rts" :key="value.id">
                       <td>{{formatData2(value.finalizado)}}</td>
                       <td><router-link :to="'/bookinfor/' + value.book_id">{{value.book_titulo}}</router-link></td>
                       <td><i>{{value.pergunta}}</i></td>
                       <td>{{value.tempo}}s</td>
                       <td>{{value.rtp}}</td>
                   </tr>
               </table>
               <h4>Reportar erro | Ajuda</h4>
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
import RTS from '../services/rts'

export default {
    components: {
        RANK,
        MENU
    },
    methods: {
        formatData2(data){

            var d = data.split(' ')
            var h = d[1].split(':')

            var hr

            if(d[2] == 'pm'){
                if(h[0] == '12'){
                    hr = '00'
                }else{
                    
                    hr = parseInt(h[0]) + parseInt(12)
                }
            }else{
                hr = h[0]
            }

            const r = d[0] + ' ' + hr + 'h' + h[1] + 's' + h[2]

            return r;
        },
    },
    data(){
        return {
            userNick: this.$route.params.id,
            listaRts: []
        }
    },
    mounted(){
        RTS.listaRTS(this.$route.params.id).then(res => {
            this.listaRts = res.data.TOTALRTS
        })
    },
    watch: {
        $route(to, from) {
        
            this.userNick = this.$route.params.id
            RTS.listaRTS(this.$route.params.id).then(res => {
                this.listaRts = res.data.TOTALRTS
            })

        }
    }

}

</script>
<style>

</style>