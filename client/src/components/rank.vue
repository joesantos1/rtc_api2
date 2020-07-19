<template>
    <div class="rankingPadrao">
        
        <h4>Campeonato do Mês - Ranking Geral</h4>
        <div class="tb-div">
            
        <table class="tb-rankp" cellspacing="0px">
            <tr id="primeiraLinha">
                <td>Po.</td>
                <td>Campeão</td>
                <td>RTP</td>
                <td>Prêmio</td>
            </tr>
            <tr v-for="value of listaRank" :key="value.idb" v-bind:id="value.nick==nu.nick ? 'tbru' : ''">
                <td id="pos">{{value.pos}}º</td>
                <td><router-link :to="'/rts/' + value.nick">{{value.nick}}</router-link></td>
                <td>{{value.rtp}}</td>
                <td>R$ {{value.premio}}</td>
            </tr>
        </table>
        </div>
    </div>
</template>
<script>

import RANK from '../services/rank'

export default {
    name: "Ranking",
    data(){
        return {

            listaRank: [],
            nu: JSON.parse(localStorage.getItem('_user')) == undefined ? 0 : JSON.parse(localStorage.getItem('_user'))
        }
    },
    
    mounted(){
        RANK.listaRank().then(res => {
            this.listaRank = res.data.rank
        })
    }

}
//console.log(listaRank);

</script>
<style>

</style>