<template>
    <div class="products">
        <section class="h-100 gradient-form">
            <div class="container py-5 h-100">
                <h1>{{ $t('products.title') }}</h1>
                <div class="row d-flex justify-content-center align-items-center h-100 pannel">
                    <div class="col-xl-10">
                        <div class="row g-0 d-flex justify-content-center">

                            <div class="col-lg-6 ">
                                <div class="text-center">
                                    <h2 class="card_title">
                                        <span v-if="products.length > 0" >{{ $t('products.subTitle') }}</span>
                                        <span v-else>{{ $t('products.noProducts') }}</span>
                                    </h2>
                                </div>
                            </div>

                            <div v-if="products.length > 0" class="row">
                                <div class="col">
                                    <div class="row filtersMenu pannel">
                                        <h3>{{ $t('products.filters') }} <font-awesome-icon icon="fa-solid fa-filter" /></h3> 
                                        <div class="filterSection" >
                                            <div class="filterBtn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDate" aria-expanded="false" aria-controls="collapseDate">
                                                Date
                                            </div>
                                            <ul class="collapse" id="collapseDate">
                                                <li><input  v-on:change="setRecentlyAdded" v-model="recentlyAdded" name="recent" type="checkbox" v-bind:value="'true'" /><label>Recent</label></li>
                                            </ul>
                                            <div>

                                            </div>                                                
                                        </div>
                                        <div class="filterSection" >
                                            <div class="filterBtn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseGenre" aria-expanded="false" aria-controls="collapseGenre">
                                                Genres
                                            </div>
                                            <ul class="collapse" id="collapseGenre">
                                                <li><input v-on:change="setGenre" v-model="genrePicked" name="genre" type="radio" v-bind:value="''" checked /><label>All</label></li>
                                                <li><input v-on:change="setGenre" v-model="genrePicked" name="genre" type="radio" v-bind:value="'Horror'" /><label>Horror</label></li>
                                                <li><input v-on:change="setGenre" v-model="genrePicked" name="genre" type="radio" v-bind:value="'Romantic'" /><label>Romantic</label></li>
                                                <li><input v-on:change="setGenre" v-model="genrePicked" name="genre" type="radio" v-bind:value="'Adventure'" /><label>Adventure</label></li>
                                            </ul>
                                        </div>
                                        <div class="filterSection" >
                                            <div class="filterBtn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFormat" aria-expanded="false" aria-controls="collapseFormat">
                                                Format
                                            </div>
                                            <ul class="collapse" id="collapseFormat">
                                                <li><input v-on:change="setFormat" v-model="formatPicked" name="format" type="radio" v-bind:value="'All'" :checked="'All' == params.format" /><label>All</label></li>
                                                <li><input v-on:change="setFormat" v-model="formatPicked" name="format" type="radio" v-bind:value="'film'" :checked="'films' == params.format" /><label>Films</label></li>
                                                <li><input v-on:change="setFormat" v-model="formatPicked" name="format" type="radio" v-bind:value="'serie'" :checked="'series' == params.format" /><label>Series</label></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

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
        name: 'Products',
        components:{
            ProductCardComp
        },
        data() {
            return {
                products: [],
                totalPage: 0,
                currentPage: 0,
                
                formatPicked: '',
                genrePicked: '',
                recentlyAdded: false,
                
                params: {
                    format:'All',
                    recentlyAdded: 'false',
                    pageSize: 10,
                    page: 1
                },

                cart: [],
            }
        },
        created(){

            this.params.format = this.$store.getters.getFormat;
        },
        mounted() {
            //this.displayProducts();        
            this.getProducts();
        },
        methods: {
            displayProducts: function(){
                this.products = this.$store.getters.getProducts;
                this.totalPage = this.$store.getters.getTotalPages;
                this.currentPage = this.$store.getters.getCurrentPage;
            },
            addToCart: function (product) {
                this.$store.commit('addToCart', product);
                this.cart = this.$store.state.cart;
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
            setFormat(){
                this.params.format = this.formatPicked;
                this.$store.commit('setFormat', this.formatPicked);
                this.getProducts();
            },
            setGenre(){
                this.params.genre = this.genrePicked;
                this.$store.commit('setGenre', this.genrePicked);
                this.getProducts();
            },
            setRecentlyAdded(){
                this.params.recentlyAdded = this.recentlyAdded;
                this.$store.commit('setRecentlyAdded', this.recentlyAdded);
                this.getProducts();
            },
            getProducts: function (event) {
                const self = this;
                this.$store.dispatch('products',this.params
                ).then(function (response) {
                    self.displayProducts();
                }, function (error) {
                    console.log(error);
                })
            }
        }
    }

</script>