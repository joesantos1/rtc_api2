<template>
  <div>
    <div class="boxGeral"> 

        <!-- MENU ************* -->
        <MENU />
        <!-- FIM DO MENU ************** -->
        <div class="boxcontent">
            <div class="boxcontent-child">
                <div class="login-user">
                <h2>Cadastro:</h2>
                <form  @submit.prevent="fazerCadastro">
                    <p>
                    <label for="nick">Nickname (ID) (*):</label><br>
                    <input type="text" name="nick" v-model="dadosForm.nick">
                    </p>
                    <p>
                        <p>
                    <label for="email">Email (*):</label><br>
                    <input type="text" name="email" v-model="dadosForm.email">
                    </p>
                    <p>
                        <p>
                    <label for="nome">Nome (*):</label><br>
                    <input type="text" name="nome" v-model="dadosForm.nome">
                    </p>
                    <p>
                        <p>
                    <label for="pass">Senha (*):</label><br>
                    <input type="password" name="pass" v-model="dadosForm.pass">
                    </p>
                    <p>
                    <label for="pass_confirm">Confirmar Senha (*):</label><br>
                    <input type="password" name="pass_confirm" v-model="dadosForm.pass_confirm">
                    </p>
                    <h3 v-if="listaError">
                        <ul class="errors">
                            <li>{{listaError.msg}}</li>
                        </ul>
                    </h3>
                    <p><button type="submit">Entrar</button></p>
                </form>
                </div>
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
import CADuser from '../services/reqUser'

export default {
    components: {
        RANK,
        MENU
    },
    data(){
        return {
            dadosForm: {
                nick: null,
                pass: null,
                email: null,
                pass_confirm: null,
                nome: null,
            },
            listaError: false
        }
    },
    methods: {
        fazerCadastro(){
            
            if(this.dadosForm.nick == null){
                return this.listaError = {msg: 'Por favor, digite um Nickname (ID) (*).'}
            }

            if(this.dadosForm.pass == null){
                return this.listaError = {msg: 'Por favor, digite uma senha (*).'}
            }
            if(this.dadosForm.nome == null){
                return this.listaError = {msg: 'Por favor, digite seu Nome (*).'}
            }
            if(this.dadosForm.email == null){
                return this.listaError = {msg: 'Por favor, digite um email válido. (*).'}
            }
            if(this.dadosForm.pass_confirm == null){
                return this.listaError = {msg: 'Senhas não conferem (*).'}
            }

            

            CADuser.cadUser(this.dadosForm).then(res => {

                var js = JSON.stringify(res.data.user)
                
                localStorage.setItem('_user', js)

                localStorage.setItem('access_token',res.data.token)
                
                return location.replace('/');
            
            }).catch(error => {
                this.dadosForm.pass_confirm = null
                this.dadosForm.pass = null
                this.listaError = error.response.data.error
            });
            
        }
    }

}
</script>

<style>

</style>