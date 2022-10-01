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
        methods: {
            increment(){
                this.total += 1;
            }
        }
    }
</script>


<style scoped>

</style>