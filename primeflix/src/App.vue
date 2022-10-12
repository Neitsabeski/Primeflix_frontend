<template>
  <div>
    <HeaderComp/>
    <MainComp />
    <div class="content">
      <router-view/>
    </div>
    
    <FooterComp />
  </div>
</template>

<script>
  // @ is an alias to /src
  import HeaderComp from '@/components/partials/HeaderComponent'
  import FooterComp from '@/components/partials/FooterComponent'

  import MainComp from '@/components/navigation/MainComponent'
  
  export default {
    components: {
      FooterComp,
      MainComp,
      HeaderComp
    }
  }
</script>