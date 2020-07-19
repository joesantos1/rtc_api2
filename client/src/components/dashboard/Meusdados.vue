<template>
<div>
<h3>Meus dados</h3>
<h4>Editar foto de perfil</h4>

    <div class="sucessos" v-if="confirmaUpd" @click="confirmaUpd=false">{{confirmaUpd}}</div>
    <div v-if="listaError" class="errors" @click="listaError=false">[x] {{listaError.msg}}</div>

    <form action="">
        <p><img src="../../assets/logo.png" alt="fotoUserPerfil" width="100px"></p>
        <input type="file" name="fotoUser"> <p>(*) Formato e tamanho de arquivo permitido: .jpg e .png; Tam. max. 3mb;</p>

        <button type="submit">Atualizar foto</button>
    </form>
    <h4>Atualizar meus dados:</h4>
  <form  @submit.prevent="atualizaCadastro">
    <p>
    <label for="nick">Nickname (ID) (*):</label><br>
    <input type="text" name="nick" disabled v-model="dadosForm.nick">
    </p>
    <p>
        <p>
    <label for="email">Email (*):</label><br>
    <input type="text" name="email" disabled v-model="dadosForm.email">
    </p>
    <p>
    <p>
    <label for="nome">Nome (*):</label><br>
    <input type="text" name="nome" disabled v-model="dadosForm.nome">
    </p>
    <p>
    <label for="nome">Data de Nascimento (*):</label><br>
    <input type="text" name="nasc" disabled v-model="dadosForm.nasc">
    </p>
    <p>
    <label for="nome">Whatsapp:</label><br>
    <input type="text" name="telefone1" v-model="dadosForm.tel1">
    </p>
    <p>
    <label for="nome">Telefone 2:</label><br>
    <input type="text" name="telefone2" v-model="dadosForm.tel2">
    </p>
    <p>
    <label for="nome">Endereço:</label><br>
    <input type="text" name="endereco" v-model="dadosForm.endereco">
    </p>
    <p>
    <label for="nome">Cidade:</label><br>
    <input type="text" name="cidade" v-model="dadosForm.cidade">
    </p>
    <p>
    <label for="nome">Estado:</label><br>
    <select id="estado" name="estado" v-model="dadosForm.estado">
        <option value="AC">Acre</option>
        <option value="AL">Alagoas</option>
        <option value="AP">Amapá</option>
        <option value="AM">Amazonas</option>
        <option value="BA">Bahia</option>
        <option value="CE">Ceará</option>
        <option value="DF">Distrito Federal</option>
        <option value="ES">Espírito Santo</option>
        <option value="GO">Goiás</option>
        <option value="MA">Maranhão</option>
        <option value="MT">Mato Grosso</option>
        <option value="MS">Mato Grosso do Sul</option>
        <option value="MG">Minas Gerais</option>
        <option value="PA">Pará</option>
        <option value="PB">Paraíba</option>
        <option value="PR">Paraná</option>
        <option value="PE">Pernambuco</option>
        <option value="PI">Piauí</option>
        <option value="RJ">Rio de Janeiro</option>
        <option value="RN">Rio Grande do Norte</option>
        <option value="RS">Rio Grande do Sul</option>
        <option value="RO">Rondônia</option>
        <option value="RR">Roraima</option>
        <option value="SC">Santa Catarina</option>
        <option value="SP">São Paulo</option>
        <option value="SE">Sergipe</option>
        <option value="TO">Tocantins</option>
        <option value="EX">Estrangeiro</option>
    </select>
    </p>

    <button type="submit">Atualizar cadastro</button>
    </form>


</div>
  
</template>

<script>

import UPDuser from '../../services/reqUser'

export default {
    data(){
        return {
            dadosForm: {
                nick: null,
                email: null,
                nome: null,
                nasc: null,
                cidade: null,
                estado: null,
                tel1: null,
                tel2: null,
                endereco: null
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
        atualizaCadastro(){

           const {cidade, estado, tel1, tel2, endereco } = this.dadosForm

            if(cidade == null && estado == null && tel1 == null && tel2 == null && endereco == null){
                return this.listaError = {msg: 'Por favor, preencha o campo que deseja atualizar.'}
            }

            UPDuser.updUser(this.dadosForm).then(res => {
                this.confirmaUpd = 'Dados atualizados com sucesso.'
            }).catch(error => {
                this.listaError = error.response.data.error
            })
        }
    },
    mounted(){
        UPDuser.dataUser().then(res => {
            this.dadosForm.nome = res.data.nome
            this.dadosForm.email = res.data.email
            this.dadosForm.tel1 = res.data.tel1
            this.dadosForm.tel2 = res.data.tel2
            this.dadosForm.endereco = res.data.endereco
            this.dadosForm.cidade = res.data.cidade
            this.dadosForm.nasc = res.data.nasc
            this.dadosForm.nick = res.data.nick
            this.dadosForm.estado = res.data.estado
        })
    }

}
</script>

<style>

</style>