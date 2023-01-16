<template>
    <div>
      <HeaderOfficeComp v-if="checkStatus"/>
      <router-view/>
    </div>
  </template>
  
  <script>
  
    import HeaderOfficeComp from '@/components/layout/HeaderOfficeComponent'
  
    export default {
        data:{
            status: ''
        },
        components: {
            HeaderOfficeComp
        },
        created(){
            this.status = this.$store.getters.getStatus;
            this.$store.commit('alreadyConnected');
        },
        methods: {
            checkStatus() {
                return this.status != '' && this.status != 'client';
            }
        }
    }
  
  </script>