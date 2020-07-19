<template>
<div>
      <div class="boxGeral">
 <!-- MENU ************* -->
        <MENU />
        <!-- FIM DO MENU ************** -->
    
    <div class="boxcontent">
        <div class="boxcontent-child">

    <h3><router-link to="/">Voltar</router-link> | Novo RT | Criando nova questão</h3>
    <h4>
        Importante:
        <ul>
            <li>A questão precisa ser objetiva e com poucas palavras.</li>
            <li>Erros gramaticais ou de escrita invalidará a questão.</li>
            <li>Não é permitido responder a questão na própria pergunta.</li>
            <li>Evite perguntas longas ou com muitas palavras.</li>
            <li>A resposta precisa ser retirada diretamente do livro escolhido.</li>
        </ul>
    </h4>

    <div class="errors" v-if="listaError" @click="listaError=false">{{listaError}}</div>
    <div class="sucessos" v-if="confirmaUpd" @click="confirmaUpd=false">{{confirmaUpd}}</div>

    <form @submit.prevent="criaNovoRt">

    <label>Livro:(*)</label><br>
    <select name="book" v-model="df.book">
        
        <option :value="lb.ib" v-for="lb of listaBooks" :key="lb.id" >{{lb.book_titulo}}</option>
        
    </select><br><br>
    <label>Pergunta:(*)</label><br>
    <textarea name="pergunta" id="" cols="100" rows="3" v-model="df.pergunta"></textarea><br><br>
    <label>Opção 1:(*)</label>
    <input type="text" name="op1" v-model="df.op1"><br><br>
    <label>Opção 2:(*)</label>
    <input type="text" name="op2" v-model="df.op2"><br><br>
    <label>Opção 3:(*)</label>
    <input type="text" name="op3" v-model="df.op3"><br><br>
    <label>Opção 4:(*)</label>
    <input type="text" name="op4" v-model="df.op4"><br><br>
    <label>Resposta correta (Opção):(*)</label>
    <select name="resposta" v-model="df.resposta">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
    </select>
    <br><br>
    <label>Onde encontrar e revisar resposta:(*) <i>Ex.: Cap. 4, Pag. 100, após 2º paragrafo...</i></label><br>
    <textarea name="detalhes" id="" cols="100" rows="2" v-model="df.detalhes"></textarea><br><br>
    <p><i>(*) Preenchimento obrigatórios.</i></p>
    <button type="submit">Cadastrar</button> | <button>Limpar</button>
    </form>
    
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
import NOVORT from '../services/novort'

export default {
    components: {
        RANK,
        MENU
    },
    data(){
        return {
            listaError: false,
            confirmaUpd: false,
            df: {
                book: '',
                pergunta: '',
                op1: '',
                op2: '',
                op3: '',
                op4: '',
                resposta: '',
                detalhes: ''
            },
            listaBooks: []
        }
    },
    methods: {
        criaNovoRt(){

            for(var v in this.df){
                if(this.df[v]=='' || this.df[v]==' '){
                    return this.listaError = 'Por favor, preencha todos os campos obrigatórios.'
                }
            }

            NOVORT.novoRt(this.df).then(() => {

                for(var v in this.df){
                    this.df[v] = ''
                }

                this.confirmaUpd = 'Questão criada com sucesso. Nosso time irá avaliar a questão. Sendo aprovada, você recebe automáticamente sua recompensa. Você pode verificar suas questões criadas em seu Painel de Usuário.'
                return
            }).catch(error => {
                this.listaError = 'Ocorreu algum erro. Por favor, tente mais tarde.'
                return
            })
        }
    },
    mounted(){
        NOVORT.ListaBooks().then(r => {
            this.listaBooks = r.data.b
        })
    }
}
</script>

<style>

</style>