<template>
  <div class="catalog py-5">
    <div class="container">
      <div class="row row-cols-3 row-cols-sm-2 row-cols-sm-5 g-3">
        <ProductComp />
      </div>
    </div>
  </div>
</template>

<script>
import ProductComp from '@/components/display/ProductComponent'

export default {
  components:{
    ProductComp
  }
}
</script>