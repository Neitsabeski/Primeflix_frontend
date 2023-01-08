<template>
    <div class="product">
        <section class="h-100 gradient-form ">
            <div class="container py-5 h-100">
                <h1>Product</h1>
                <div class="row d-flex justify-content-center align-items-center h-100 pannel">
                    <div class="col-xl-10">
                        <div class="row g-0 d-flex justify-content-center text-center">

                            <div class="card_title">
                                <h2>
                                    <span v-if="product">{{ product.title }}</span>
                                    <span v-else>No product</span>
                                </h2>
                            </div>

                            <div v-if="product" class="col-md-8">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="cadre">
                                            <img :src="product.pictureUrl" :alt="product.url" />
                                        </div>
                                    </div>

                                    <div class="col-lg-6">
                                        <hr/>
                                        <div class="row">
                                            <h3 class="col-md-6 pinky">
                                                {{ $t('product.format')}}
                                            </h3>
                                            <p class="col-md-6">
                                                {{ product.format.name }}
                                            </p>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <h3 class="col-md-6 pinky">
                                                {{ $t('product.rating')}}
                                            </h3>
                                            <div class="col-md-6">
                                                {{ product.rating }}
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <h3 class="col-md-6 pinky">
                                                {{ $t('product.released')}}
                                            </h3>
                                            <p class="col-md-6">
                                                {{ dateFormat(product.releaseDate) }}
                                            </p>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <h3 class="col-md-6 pinky">
                                                {{ $t('product.summary')}}
                                            </h3>
                                            <div class="col-md-6"></div>
                                            <p>
                                                {{ product.summary }}
                                            </p>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <h3 class="col-md-6 pinky">
                                                {{ $t('product.genres')}}
                                            </h3>
                                            <ul class="col-md-6">
                                                <li v-for="genre in product.genres">
                                                    {{ genre.name }}
                                                </li>
                                            </ul>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <h3 class="col-md-6 pinky">
                                                {{ $t('product.directors')}}
                                            </h3>
                                            <ul class="col-md-6">
                                                <li v-for="director in product.directors">
                                                    {{ director.firstName }} {{ director.lastName }}
                                                </li>
                                            </ul>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <h3 class="col-md-6 pinky">
                                                {{ $t('product.actors')}}
                                            </h3>
                                            <ul class="col-md-6">
                                                <li v-for="actor in product.actors">
                                                    {{ actor.firstName }} {{ actor.lastName }}
                                                </li>
                                            </ul>
                                        </div>
                                        <hr />
                                    </div>
                                </div>
                            </div>

                            <div v-if="product" class="col-md-4">
                                <div>
                                    <h4 class="pinky">
                                        Get it
                                    </h4>
                                    <p>
                                        {{ $t('product.stock')}} : {{ product.stock }}
                                    </p>
                                    <p>
                                        {{ $t('product.price') }} :  {{ product.price }} €
                                    </p>
                                    <button v-if="product.stock > 0" class="btn btn-primary"  v-on:click="addToCart(product)">Add to cart <font-awesome-icon
                                            icon="shopping-cart" /></button>
                                    <button v-else class="btn btn-primary disabled">Add to cart <font-awesome-icon
                                            icon="shopping-cart" /></button>
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
import utils from '../helpers/utils'

export default {
    name: 'Product',
    components:{
        StarsComp
    },
    props: ['id'],
    created() {
        const self = this;
        this.$store.dispatch('product', this.id
            ).then(function (response) {
                //self.displayProducts();
            }, function (error) {
                console.log(error);
            })
        //this.$store.dispatch('product', this.id);
    },
    computed: {
        product: function () {
            if(!this.$store.getters.getCurrentProduct) this.$router.push(`/404`);

            return this.$store.getters.getCurrentProduct;
        }
    },
    methods: {
        dateFormat(date){
            return utils.formatDate(date);
        },
        addToCart: function (product) {
            this.$store.commit('addToCart', product, this.$store.getters.getLang);
            this.cart = this.$store.state.cart;
        }
    }
}

</script>