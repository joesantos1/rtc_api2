<template>
<div>
        <div class="bookrt">
            
            <div>
                <ul>
                    <li id="li-op1"><label for="op1">{{rtdadosRes.qop1}}</label></li>
                    <li id="li-op2"><label for="op2">{{rtdadosRes.qop2}}</label></li>
                    <li id="li-op3"><label for="op3">{{rtdadosRes.qop3}}</label></li>
                    <li id="li-op4"><label for="op4">{{rtdadosRes.qop4}}</label></li>
                </ul>
                    <button @click="avancaRT()">Próxima Questão</button>
            </div>

            <p><router-link to="/">Sair do RT</router-link> | <a href="/denuncia-questao/***">#Reportar erro</a> </p>
        </div>       

        <div class="confirma-resposta">

            <div v-if="rtdadosRes.RTres.respC" class="resposta-correta">
                <h2>Resposta correta!</h2>
                <h3>
                    Tempo gasto: {{rtdadosRes.RTres.tempo}}s<br>
                    Ganhos: {{rtdadosRes.RTres.rtp}} RTPs<br>
                    Posição atual: {{rtdadosRes.RTres.posR}}º lugar <br>
                    Prêmio: R$ {{rtdadosRes.RTres.premio}}<br>
                </h3>
                <p>Parabéns! Continue realizando o RT e ganhe muito mais!</p>
                <p>Revisão de resposta: </p>
            </div>

            <div v-else class="resposta-incorreta">
                <h2>Resposta incorreta!</h2>
                <h3>
                    Ganhos: 0 RTPs<br>
                    Posição atual: {{rtdadosRes.RTres.posR}}º lugar<br>
                    Prêmio: R$ {{rtdadosRes.RTres.premio}}<br>
                </h3>
                <p>Que pena! Continue realizando o RT e ganhe muito mais!</p>
            </div>
        </div>
</div>

</template>

<script>
export default {
    props: ['rtdadosRes'],
    methods: {
        avancaRT(){
            this.$router.go()
        }
        
    }
}
</script>

<style>

</style>