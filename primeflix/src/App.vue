<template>
  <div>
    <HeaderComp/>
    <router-view/>
    <FooterComp />
    
    <BackgroundComp />
  </div>
</template>

<script>

  import HeaderComp from '@/components/HeaderComponent'
  import FooterComp from '@/components/FooterComponent'
  import BackgroundComp from '@/components/BackgroundSvg.vue'

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