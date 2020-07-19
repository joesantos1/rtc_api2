<template>
      <div class="boxMenu">
            <ul>
                <li :class="this.$route.path === '/' ? className : ''"><router-link to="/">Entrar no Campeonato</router-link></li>
                <li :class="this.$route.path === '/premium' ? className : ''"><router-link to="/premium">Campeonato Premium</router-link></li>
                <li :class="classComu"><router-link to="/comunidade">Comunidade</router-link> </li>
                <li :class="this.$route.path === '/historico' ? className : ''">Histórico de Campeonatos</li>
                <li :class="this.$route.path === '/comofuciona' ? className : ''">Como funciona</li>
                <li :class="this.$route.path === '/faq' ? className : ''">FAQ</li>
            </ul>
            
        </div>
</template>

<script>
export default {
    data(){
        return {
            className: 'box-menu-ativo',
            classComu: ''
        }
    },
    created(){
        if(this.$route.name === 'bookcomunit'){
            return this.classComu = 'box-menu-ativo'
        }
        if(this.$route.name === 'comunit'){
            return this.classComu = 'box-menu-ativo'
        }
    }
}
</script>

<style>

</style>