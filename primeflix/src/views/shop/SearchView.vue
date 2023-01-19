<template>
    <div class="search">
        <section class="h-100 gradient-form">
            <div class="container py-5 h-100">
                <h1>{{ $t('search.title') }}</h1>
                <div class="row d-flex justify-content-center align-items-center h-100 pannel">
                    <div class="col-xl-20">
                        
                        <div class="row g-0 d-flex justify-content-center">

                            <div class="col-lg-6 ">
                                <div class="text-center">
                                    <h2 class="card_title">
                                        <span v-if="products.length > 0">{{ $t('search.subTitle')}}</span>
                                        <span v-else>{{ $t('search.noResult')}}</span>
                                    </h2>
                                </div>
                            </div>
                        

                            <div v-if="products.length > 0" class="row justify-content-center">
                                <div class="col-md-10">
                                    <div class="container">
                                        <div class="row">
                                            <ProductCardComp v-for="product in products" :key="product.id" :product="product"/>
                                        </div>
                                    </div>
                                    <!-- PAGES SELECTION -->
                                    <div class="row pinky text-center page-select">
                                        <div class="col-md-4">
                                            <span v-if="currentPage > 1" class="card_action"
                                                @click="changePage('-')"> &#60; {{ $t('products.previousBtn') }}
                                            </span>
                                            <span v-else class="">&#60; {{ $t('products.previousBtn') }}</span>
                                        </div>
                                        <div class="col-md-3">
                                            <span> {{ currentPage }} / {{ totalPage }} </span>
                                        </div>
                                        <div class="col-md-4">
                                            <span v-if="currentPage < totalPage" class="card_action"
                                                @click="changePage('+')"> {{ $t('products.nextBtn') }} &#62; </span>
                                            <span v-else> {{ $t('products.nextBtn') }} &#62; </span>
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
        name: 'Search',
        components:{
            ProductCardComp
        },
        props:['key'],
        data() {
            return {
                
                products: [],
                totalPage: 0,
                currentPage: 0,
                
                params: {
                    pageSize: 10,
                    page: 1
                },

            }
        },
        mounted() {       
            this.getProducts();
        },
        methods: {
            displayProducts: function(){
                this.products = this.$store.getters.getProducts;
                this.totalPage = this.$store.getters.getTotalPages;
                this.currentPage = this.$store.getters.getCurrentPage;
            },
            changePage: function (char) {
                switch (char) {
                    case '-':
                        if(this.params.page > 1){
                            this.params.page -= 1;
                            this.getProducts();
                        }
                        break;
                    case '+':
                        if(this.params.page < this.totalPage){
                            this.params.page += 1;
                            this.getProducts();
                        }
                        break;
                    default:
                }
            },
            getProducts: function (event) {
                const text = this.$store.getters.getSearchText;
                if(text){
                    const self = this;
                    this.$store.dispatch('search', { "params":this.params, "text": text}
                    ).then(function (response) {
                        self.displayProducts();
                    }, function (error) {
                        console.log(error);
                    })
                }
            }
        }
    }

</script>