<template>
<div>
    <div v-if="!RTfinalizado">
        <h3><router-link to="/">Voltar</router-link> | {{rtdados.btitulo}} | RT | Questão: </h3>
            <p>Sobre o livro: {{rtdados.btitulo}}, responda:</p>
                    <h3>{{rtdados.qpergunta}}</h3>
        <div v-if="!resultRT">
            <form @submit.prevent="salvar">
            <ul>
                <li id="li-op1"><input type="radio" name="resposta" id="op1" value="1" v-model="rts.resposta"><label for="op1">{{rtdados.qop1}}</label></li>
                <li id="li-op2"><input type="radio" name="resposta" id="op2" value="2" v-model="rts.resposta"><label for="op2">{{rtdados.qop2}}</label></li>
                <li id="li-op3"><input type="radio" name="resposta" id="op3" value="3" v-model="rts.resposta"><label for="op3">{{rtdados.qop3}}</label></li>
                <li id="li-op4"><input type="radio" name="resposta" id="op4" value="4" v-model="rts.resposta"><label for="op4">{{rtdados.qop4}}</label></li>
            </ul>
        
                <button type="submit">Confirmar</button>
                <button type="button" id="pular" onclick="">Pular</button>
            </form>
            <div class="time-rt" id="timert">
                <h3><span id="timer" ref="timer">{{countDown2}}</span></h3>
                <p><span id="countdown">{{countDown}} RTPs</span></p>
            </div>
        </div>
        <rtresult v-if="resultRT" :rtdadosRes="rtDadosResult" />
    </div>
    <div v-else class="error-content">
        <h3><router-link to="/">> Voltar para Página Inicial</router-link></h3>
        <h3>Você já concluiu este RT. Todas as questões foram respondidas. <br>
    Um novo RT com novas questões esta sendo elaborado. Volte aqui mais tarde.</h3>
    </div>
</div>
</template>

<script>
import rtsBook from '../services/rtsbook'
import rtresult from './RespondeRtResposta.vue'

export default {
    components: {
        rtresult
    },
    data(){
        return {
            rtdados: [],
            ranKi: [],
            countDown: 91,
            countDown2: '1:31',
            u: JSON.parse(localStorage.getItem('_user')),
            rts: {
                rti: 0,
                qti: 0,
                resposta: 0,
                token: localStorage.getItem('access_token'),
                nick: ''
            },
            resultRT: false,
            rtDadosResult: false,
            RTfinalizado: false
        }
    },

    mounted(){
         rtsBook.listarInfor(this.$route.params.id).then(res => {
            this.rtdados = res.data
        }).catch(()=>{
            this.RTfinalizado = true;
        })

    },
        methods: {
        countDownTimer() {
            if(this.countDown > 0) {
                setTimeout(() => {
                    this.countDown -= 1
                    this.countDownTimer()
                }, 1000)
            }
        },
        startTimer() {
            var presentTime = this.countDown2;
            var timeArray = presentTime.split(/[:]+/);
            var m = timeArray[0];
            var s = this.checkSecond((timeArray[1] - 1));
            if(s==59){
                m=m-1
                }

            if(m<0){this.countDown2 = 0; return}
            
            setTimeout(() => {
                this.countDown2 = m + ":" + s;
                this.startTimer()
            }, 1000);
        },
        checkSecond(sec) {
            if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
            if (sec < 0) {sec = "59"};
            return sec;
        },
        //ENVIA POST DO RT REALIZADO ------------------
        salvar(){
            this.rts.rti = this.rtdados.rri
            this.rts.qti = this.rtdados.qqi
            this.rts.nick = this.u.nick
            
            rtsBook.salvaRt(this.rts).then(res => {
                
                this.resultRT = true
                this.rtDadosResult = {
                   qop1: this.rtdados.qop1,
                   qop2: this.rtdados.qop2,
                   qop3: this.rtdados.qop3,
                   qop4: this.rtdados.qop4,
                   RTres: res.data,
                   next: this.$route.params.id
                }
                
            })
        }
    },
    created() {
           this.countDownTimer()
           this.startTimer()
        }

}
</script>

<style>

</style>