<template>
  <div>
    <HeaderComp/>
    <router-view/>
    <FooterComp />
    
    <BackgroundComp />
  </div>
</template>

<script>

  import HeaderComp from '@/components/layout/HeaderComponent'
  import FooterComp from '@/components/layout/FooterComponent'
  import BackgroundComp from '@/components/layout/BackgroundSvg'

  export default {
    components: {
      BackgroundComp,
      FooterComp,
      HeaderComp
    },
    created(){
      this.$store.getters.getStatus;
      this.$store.commit('alreadyConnected');
    }
  }

</script>