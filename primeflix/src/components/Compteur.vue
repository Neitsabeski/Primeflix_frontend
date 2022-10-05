<template>
    <div class="compteur">
        <h1>
            Compteur
        </h1>
        <p>
            Vous avez cliqué {{ total }} fois.
        </p>
        <button @click="increment">
            cliquez ici !
        </button>
        <hr>
        <p>
            Le total général depuis vuex est de {{ totalGeneral }}
        </p>
        <p>
            Le double du total depuis vuex est de {{ doubleDuTotal }}
        </p>
    </div>
</template>

<script>
    export default {
        name: 'Compteur',
        data(){
            return{
                total: 0
            }
        },
        computed: {
            totalGeneral(){
                return this.$store.state.totalFromVuex;
            },
            doubleDuTotal(){
                return this.$store.getters.doubleDuTotal;
            }
        },
        methods: {
            increment(){
                this.total += 1;
            }
        }
    }
</script>


<style scoped>

</style>