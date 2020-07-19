<template>
  <div>
    <div class="boxGeral"> 

        <!-- MENU ************* -->
        <MENU />
        <!-- FIM DO MENU ************** -->
        <div class="boxcontent">
            <div class="boxcontent-child">
                <div class="login-user">
                <h2>Login:</h2>
                <form  @submit.prevent="fazerLogin">

                    <label for="login">Nickname (ID):</label><br>
                    <input type="text" name="login" v-model="login">
                    <p><label for="pass">Senha:</label><br>
                    <input type="password" name="pass" v-model="pass"></p>
                    <h3 v-if="listaError">{{listaError}}</h3>
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
import auth from '../services/auth'

export default {
    components: {
        RANK,
        MENU
    },
    data(){
        return {
            login: '',
            pass: '',
            listaError: false
        }
    },
    methods: {
        fazerLogin(){
            const nick = this.login;
            const pass = this.pass;

            if(nick == '' || pass == ''){
                return this.listaError = 'Por favor, digite um Nickname (ID) e Senha válidos.'
            }

            const dados = {
                nick,
                pass
            }

            auth.authUser(dados).then(res => {

                var js = JSON.stringify(res.data.user)
                
                localStorage.setItem('_user', js)

                localStorage.setItem('access_token', res.data.token)
                
                return location.replace('/')
            
            }).catch(error => {
                
                this.pass = null
                this.listaError = error.response.data.error
            });
            
        }
    }

}
</script>

<style>

</style>