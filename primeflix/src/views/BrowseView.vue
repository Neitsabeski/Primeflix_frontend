<template>
    <div class="browse">
      <PathComp />
      <CatalogComp />
    </div>
</template>

<script>
  import CatalogComp from '@/components/display/CatalogComponent'
  import PathComp from '@/components/navigation/PathComponent'

  export default {
    components:{
      CatalogComp,
      PathComp
    }
  }
</script>