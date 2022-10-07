<template>
  <div class="home">
    <h1>This is the home page</h1>
    <main>
      <section class="py-5 text-center container">
        <div class="row py-lg-5">
          <div class="col-lg-6 col-md-8 mx-auto">
            <h1 class="fw-light">Album example</h1>
            <p class="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
            <p>
              <a href="#" class="btn btn-primary my-2">Main call to action</a>
              <a href="#" class="btn btn-secondary my-2">Secondary action</a>
            </p>
          </div>
        </div>
      </section>
      <div class="album py-5 bg-light">
        <div class="container">
          <div class="row row-cols-1 row-cols-sm-2 row-cols-sm-5 g-3">
            <ProductComp />
            <ProductComp />
            <ProductComp />
            <ProductComp />
            <ProductComp />
            <ProductComp />
            <ProductComp />
            <ProductComp />
            <ProductComp />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import ProductComp from '@/components/ProductComponent'

export default {
  components:{
    ProductComp
  }
}
</script>
