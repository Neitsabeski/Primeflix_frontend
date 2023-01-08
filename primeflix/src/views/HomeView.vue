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
                      
                      <div v-for="product in products" v-bind:key=product.id
                        class="productItem col-md-2 card ">
                        <RouterLink v-bind:to="'/products/' + product.id">
                        <div class="cropped">
                            <img v-if="!product.pictureUrl" class="card-img-top"
                                src="../../public/img/products/noimage.png" alt="noimage" />
                            <img v-else class="card-img-top" :src="product.pictureUrl"
                                :alt="product.pictureUrl" />
                        </div>
                        <div class="card-body">
                            
                            <StarsComp :ratingP="product.rating"/>
                            
                        </div>
                        <div class="card-title">
                                {{ product.title }}
                        </div>
                        </RouterLink>
                        <div class="card-body">
                            {{ product.format.name }}
                            <button v-if="product.stock > 0" v-on:click="addToCart(product)"
                                class="btn btn-primary">
                                <font-awesome-icon icon="shopping-cart" /> {{ product.price }}€
                            </button>
                            <button v-else
                                class="btn btn-primary disabled">
                                <font-awesome-icon icon="shopping-cart" />
                            </button>
                        </div>
                    </div>
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

import StarsComp from '@/components/StarsComponent.vue'

export default {
  name: 'Home',
  components: {
    StarsComp
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
