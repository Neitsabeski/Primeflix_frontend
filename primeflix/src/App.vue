<template>
  <div>
    <HeaderComp/>
    <router-view/>
    <FooterComp />
  </div>

</template>

<script>
  // @ is an alias to /src
  import HeaderComp from '@/components/partials/HeaderComponent'
  import FooterComp from '@/components/partials/FooterComponent'

  export default {
    components: {
      FooterComp,
      HeaderComp
    }
  }
</script>