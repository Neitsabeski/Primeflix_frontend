<template>
    <div class="cart">
        <section class="h-100 gradient-form">
            <div class="container py-5 h-100">
                <h1>{{ $t('cart.title') }}</h1>
                <div class="row d-flex justify-content-center align-items-center h-100 pannel">
                    <div class="col-xl-10">

                        <div class="row g-0 d-flex justify-content-center">
                            <div class="col-lg-6 ">
                                <div class="text-center">
                                    <h2 class="card_title">
                                        <span v-if="cart.length">{{ $t('cart.subTitle') }}</span>
                                        <span v-else>{{ $t('cart.empty') }}</span>
                                    </h2>
                                </div>
                            </div>
                        </div>

                        <div v-if="cart.length">
                            <div class="row">
                                <h4 class="col-md-1">#</h4>
                                <h4 class="col">{{ $t('cart.productTitleHeader') }}</h4>
                                <h4 class="col">{{ $t('cart.productQuantityHeader') }}</h4>
                                <h4 class="col">{{ $t('cart.productPriceHeader') }}</h4>
                                <h4 class="col">Total</h4>
                            </div>

                            <div class="row" v-for="item in cart" v-bind:key="item.id">
                                <span class="col-md-1">{{ item.id }}</span>
                                <span class="col plink">
                                    <RouterLink v-bind:to="'/shop/products/' + item.id">
                                        {{ item.title }}
                                    </RouterLink>
                                </span>
                                <span class="col">
                                    <button class="btn pinky" @click="changeQuantity('-', item)">-</button>
                                    {{ item.quantity }}
                                    <button class="btn pinky" @click="changeQuantity('+', item)">+</button>
                                </span>
                                <span class="col">{{ item.price }} €</span>
                                <span class="col">{{ item.price * item.quantity }} €</span>
                                <hr />
                            </div>

                            <div class="row">
                                <span class="col-md-6"></span>

                                <h4 class="col">{{ $t('cart.subtotal') }}</h4>
                                <h4 class="col">{{ total }} €</h4>
                            </div>

                            <div class="row">
                                <button class="col btn btn-primary" :class="{ 'disabled': !canPurchase }" @click="purchase">{{ $t('cart.purchaseBtn') }}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
  


<script>

export default {
    name: "Cart",
    data(){
        return{
            cart: [],
            subtotal: 0
        }
    },
    created(){
        this.cart = this.$store.getters.getCart;
    },
    computed: {
        canPurchase: function () {
            return this.$store.getters.getCartCount > 0 && this.$store.getters.getStatus == 'logged';
        },
        total: function(){
            var total = 0;
            this.cart.forEach(element => {
                total += element.price * element.quantity;
            });
            return total;
        }
    },
    methods: {
        displayCart(){
            this.cart = this.$store.getters.getCart;
        },
        purchase: function(){
            const self = this;
            const cart = this.cart;
            const token = this.$store.getters.getUser.token;
            this.$store.dispatch('saveCart', { "cart":cart, "jwt":token}
            ).then(function (response) {
                self.$router.push('/shop/order');
            }, function (error) {
                console.log(error);
            })
        },
        changeQuantity: function (char, product) {
            switch (char) {
                case '-':
                    this.$store.commit('removeFromCart', product);
                    break;
                case '+':
                    this.$store.commit('addToCart', product);
                    break;
                default:
            }
        },
    }
}


</script>