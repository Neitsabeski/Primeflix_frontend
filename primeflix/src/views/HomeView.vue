<template>
  <div class="home">
    <section class="h-100 gradient-form ">
      <div class="container py-5 h-100">
        <h1>{{ $t('home.title') }}</h1>
        <div class="row d-flex justify-content-center align-items-center h-100 pannel">
          <div class="col-xl-20">

            <div class="row g-0 d-flex justify-content-center">

              <div class="col-lg-6 ">
                <div class="text-center">
                  <h2 class="card_title">
                    <span v-if="products.length > 0" >{{ $t('home.subTitle') }}</span>
                    <span v-else>{{ $t('home.noProducts') }}</span>
                  </h2>
                </div>
              </div>

              <div v-if="products.length > 0" class="row justify-content-center">
                <div class="col-md-10" >
                  <div class="container" >
                    <div class="row">
                      
                      <ProductCardComp v-for="product in products" :key="product.id" :product="product"/>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import ProductCardComp from '@/components/product/ProductCardComponent.vue'

export default {
  name: 'Home',
  components: {
    ProductCardComp
  },
  data() {
    return {
      products: [],

      params: {
          format:'All',
          recentlyAdded: 'true',
          pageSize: 5,
          page: 1
      },
    }
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    displayProducts: function () {
      this.products = this.$store.state.products;
    },
    getProducts: function (event) {
      const self = this;
      this.$store.dispatch('products', this.params
      ).then(function (response) {
        self.displayProducts();
      }, function (error) {
        console.log(error);
      })
    },
  }
}

</script>
