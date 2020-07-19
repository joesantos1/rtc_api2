<template>
<div class="paineluser-inicio">
    <h2>Olá {{listaRts.user_nome}},</h2>
    <ul>
        <li>Nickname (ID): {{listaRts.user_nick}}</li>
        <li>Conta verificada: </li>
        <li>Posição atual no Ranking: {{listaRts.posRank}}º</li>
        <li>Campeonato atual - Prêmio: R$ {{listaRts.premio}}</li>
        <li>Total de Questões realizadas: {{listaRts.rts_total}}</li>
        <li>RTP acumulado: {{listaRts.user_total_rtp}}</li>
    </ul>
    <hr>
    <h4>Histórico de RTs:</h4>
    <table cellspacing="0" id="alltb">
        <tr>
            <th>Questão realizada em:</th>
            <th>Livro | RT</th>
            <th>Questão</th>
            <th>Tempo de resposta</th>
            <th>Ganhos</th>
        </tr>
        <tr v-for="value of listaRts.rts" :key="value.id">
            <td>{{formatData(value.finalizado)}}</td>
            <td><router-link :to="'/bookinfor/' + value.book_id">{{value.book_titulo}}</router-link></td>
            <td><i>{{value.pergunta}}</i></td>
            <td style="text-align:center;">{{value.tempo}}s</td>
            <td>{{value.rtp}} RTP</td>
        </tr>
    </table>
    
    <h4>RT | Questões criadas:</h4>
    <table cellspacing="0" id="alltb">
        <tr>
            <th>Criada em:</th>
            <th>Livro | RT</th>
            <th>Questão</th>
            <th>Status</th>
            <th>Likes</th>
            <th>Ganhos</th>
        </tr>
        <tr v-for="lq of listaQue" :key="lq.id">
            <td>{{formatData(lq.criado)}}</td>
            <td><router-link :to="'/bookinfor/' + lq.bookid">{{lq.book}}</router-link></td>
            <td><i>{{lq.questao}}</i></td>
            <td>{{verStatus(lq.status)}}</td>
            <td style="text-align:center;">{{lq.likes}}</td>
            <td>{{verRecompensa(lq.status)}} RTP</td>
        </tr>
    </table>
    <h4>Reportar erro | Ajuda</h4>
</div>
</template>
<script>

import RTS from '../../services/painel'

export default {
    data(){
        return {
            listaRts: [],
            listaQue: []
        }
    },
    methods: {
        formatData(data){

            var d = data.split('T')
            var d1 = d[0].split('-')
            var h1 = d[1].split(':')
            var ha = h1[0] >= 3 ? h1[0] - 3 : parseInt(h1[0]) + 24 - 3
            var r = d1[2] + '/' + d1[1] + '/' + d1[0] + ' às ' + ha + 'h' + h1[1]

            return r;
        },
        verStatus(v){
            if(v==0){
                return 'Reprovada'
            }
            if(v==1){
                return 'Aprovada'
            }
            if(v==2){
                return 'Em análise'
            }
            if(v==3){
                return 'Cancelada'
            }
        },
        verRecompensa(v){
            if(v==1){
                return 90
            }else{
                return 0
            }
        }
    },
    mounted(){
        RTS.listaRTS().then(res => {
            this.listaRts = res.data.TOTALRTS
        })
        RTS.ListaQuestions().then(res => {
            this.listaQue = res.data.dq
        })
    }

}

</script>
<style>

</style>