<template>
    <div class="DashboardComponent">
        <h3 class="text-uppercase">{{ user.role }}</h3>
        <p>Welcome {{ user.data.firstName }}</p>
    </div>
</template>

<script>

    export default {
        name: 'Dashboard',
        data(){
            return{
            }
        },
        computed: {
            user(){
                return this.$store.getters.getUser;
            }
        }
    }

</script>