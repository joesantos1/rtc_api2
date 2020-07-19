<template>
<span class="likes-complaints">
  <button @click="enviaLike(catid)" :class="c">({{tlikes}}) Gostei</button> <button v-if="tcompl >= 0" @click="enviaComplaint(catid)" :class="c2">({{tcompl}}) Discordo</button>
</span>
</template>

<script>
import regLC from '../services/LeC'

export default {
    props: ['lc'],
    data(){
        return {
            count: [],
            tlikes: this.lc.likes,
            tcompl: this.lc.denuncias,
            catid: this.lc.catid,
            cat: this.lc.cat,
            ulikes: this.lc.ulikes,
            ucompl: this.lc.ucompl,
            c: 'btoff',
            c2: 'btoff2',
            im: 'like.png'
        }
    },
    methods: {

        enviaComplaint(v,id){
            
            const dados = {
                catid: this.catid,
                category: this.cat
            }

            regLC.regisComplaint(dados).then((res) => {
                if(res.data.r==1){
                    this.mudaClass2(1)
                    return this.tcompl += 1
                }else{
                    this.mudaClass2(0)
                    return this.tcompl -= 1
                }
            })
            
        },
        enviaLike(id){

            const dados = {
                catid: this.catid,
                category: this.cat
            }

            regLC.regisLike(dados).then((res) => {
                if(res.data.r==1){
                    this.mudaClass(1)
                    return this.tlikes += 1
                }else{
                    this.mudaClass(0)
                    return this.tlikes -= 1
                }
            })
        },
        mudaClass(v){
            if(v==1){
                return this.c = 'bton'
            }
            if(v==0){
                return this.c = 'btoff'
            }
        },
        mudaClass2(v){
            if(v==1){
                return this.c2 = 'bton2'
            }
            if(v==0){
                return this.c2 = 'btoff2'
            }
        },
    },
    created(){
        this.mudaClass(this.ulikes)
        this.mudaClass2(this.ucompl)
    }
}
</script>

<style>

</style>