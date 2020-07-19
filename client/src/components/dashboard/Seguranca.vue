<template>
<div>
      <div class="sucessos" v-if="confirmaUpd" @click="confirmaUpd=false">{{confirmaUpd}}</div>
    <div v-if="listaError" class="errors" @click="listaError=false">[x] {{listaError.msg}}</div>
    <h3>Editar senha:</h3>

    <form @submit.prevent="atualizaSenha"> 
    <p>  
    <label for="pass">Senha Atual(*):</label><br>
    <input type="password" name="pass" v-model="dadosForm.pass">
    </p>
    <p>     
    <label for="newpass">Nova Senha (*) <span style="font-style:italic">(min. 5 carac.)</span>:</label><br>
    <input type="password" name="newpass" v-model="dadosForm.newpass">
    </p>
    <p>
    <label for="newpass_confirm">Confirmar nova Senha (*) <span style="font-style:italic">(min. 5 carac.)</span>:</label><br>
    <input type="password" name="newpass_confirm" v-model="dadosForm.newpass_confirm">
    </p>
    <p><button type="submit">Alterar senha</button></p>
  </form>
</div>
</template>

<script>
import UPDuser from '../../services/reqUser'

export default {
data(){
return {
    dadosForm: {
        pass: null,
        newpass: null,
        newpass_confirm: null,
    },
    listaError: false,
    confirmaUpd: false
}
},
methods: {
atualizaSenha(){

    if(this.dadosForm.pass == null){
        return this.listaError = {msg: 'Por favor, digite uma senha (*).'}
    }

    if(this.dadosForm.newpass == null){
        return this.listaError = {msg: 'Por favor, digite uma senha (*).'}
    }

    if(this.dadosForm.newpass != this.dadosForm.newpass_confirm){
        return this.listaError = {msg: 'Senhas não conferem.'}
    }

    UPDuser.updUserPass(this.dadosForm).then(res => {
        this.listaError = false
        this.dadosForm.newpass_confirm = null
        this.dadosForm.newpass = null
        this.dadosForm.pass = null
        this.confirmaUpd = 'Dados atualizados com sucesso.'
    
    }).catch(error => {
        this.dadosForm.newpass_confirm = null
        this.dadosForm.newpass = null
        this.dadosForm.pass = null
        this.listaError = error.response.data.error
    });
    
},
}
}
</script>

<style>

</style>