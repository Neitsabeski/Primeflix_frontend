<template>
    <div>
      <HeaderShopComp/>
      <router-view/>
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
      created(){
        this.$store.commit('alreadyConnected', false);
      }
    }
  
  </script>