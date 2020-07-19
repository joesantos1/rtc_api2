<template>
<div>
    <div class="boxGeral"> 

        <!-- MENU ************* -->
        <MENU />
        <!-- FIM DO MENU ************** -->
        <div class="boxcontent">
            <div class="boxcontent-child">
                <!-- INICIA RT ------>
                <RT />
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
import RT from './RespondeRt.vue'

export default {
    components: {
        RANK,
        MENU,
        RT
    }
}

</script>
<style>

</style>