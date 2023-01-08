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
                                        <span v-if="this.$store.getters.getCartCount > 0">{{ $t('cart.subTitle') }}</span>
                                        <span v-else>{{ $t('cart.empty') }}</span>
                                    </h2>
                                </div>
                            </div>
                        </div>

                        <div v-if="this.$store.getters.getCartCount > 0">
                            <div class="row">
                                <h4 class="col-md-1">#</h4>
                                <h4 class="col-md-4">{{ $t('cart.productTitleHeader') }}</h4>
                                <h4 class="col">{{ $t('cart.productQuantityHeader') }}</h4>
                                <h4 class="col">{{ $t('cart.productPriceHeader') }}</h4>
                            </div>

                            <div class="row" v-for="item in cart" v-bind:key="item.product.id">
                                <span class="col-md-1">{{ item.product.id }}</span>
                                <span class="col-md-4 plink">
                                    <RouterLink v-bind:to="'/products/' + item.product.id">
                                        {{ item.product.title }}
                                    </RouterLink>
                                </span>
                                <span class="col">{{ item.quantity }}</span>
                                <span class="col">{{ item.product.price * item.quantity }} €</span>
                                <hr />
                            </div>

                            <div class="row">
                                <span class="col-md-5"></span>
                                <h4 class="col">{{ $t('cart.subtotal') }}</h4>
                                <h4 class="col">{{ total }} €</h4>
                            </div>

                            <div class="row">
                                <button class="col btn btn-primary" type="submit"
                                    :class="{ 'disabled': !canPurchase }">{{ $t('cart.purchaseBtn') }}</button>
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
                total += element.product.price * element.quantity;
            });
            console.log(total);
            return total;
        }
    }
}


</script>