<template>
    <div class="browse">
      <MainComp />
      <div class="container">
        <section>
          <h2>Films > Horror</h2>
        </section>
      </div>
      <CatalogComp />
    </div>
</template>

<script>
  import CatalogComp from '@/components/display/CatalogComponent'
  import MainComp from '@/components/display/MainComponent'

  export default {
    components:{
      CatalogComp,
      MainComp
    }
  }
</script>