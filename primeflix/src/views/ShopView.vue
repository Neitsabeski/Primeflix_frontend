<template>
    <div>
      <HeaderShopComp @refresh="increase" />
      <router-view :key="it" />
      <FooterComp />
      
      <BackgroundComp />
    </div>
  </template>
  
  <script>
  
    import HeaderShopComp from '@/components/layout/HeaderShopComponent'
    import FooterComp from '@/components/layout/FooterComponent'
    import BackgroundComp from '@/components/layout/BackgroundSvg'
  
    export default {
      components: {
        BackgroundComp,
        FooterComp,
        HeaderShopComp
      },
      data(){
        return {
          it: 0
        }
      },
      created(){
        this.$store.commit('alreadyConnected', false);
      },
      methods:{
        increase: function(){
          this.it++;
        }
      }
    }
  
  </script>