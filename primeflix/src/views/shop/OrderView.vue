<template>
    <div class="Order">
        <section class="h-100 gradient-form">
            <div class="container py-5 h-100">
                <h1>{{ $t('order.title') }}</h1>
                <div class="row d-flex justify-content-center align-items-center h-100 pannel">
                    <div class="col-xl-10">
                        <div class="row g-0 d-flex justify-content-center">
                            <div class="col-lg-6 ">
                                <div class="text-center">
                                    <h2 class="card_title">
                                        {{ $t('order.subTitle') }}
                                    </h2>
                                </div>
                                <div>
                                    <h3>
                                        {{ $t('order.productsTitle') }}
                                    </h3>
                                    <div>
                                        <div class="row" v-for="item in cart" v-bind:key="item.id">
                                            <span class="col-md-1">{{ item.id }}</span>
                                            <span class="col plink">
                                                <RouterLink v-bind:to="'/shop/products/' + item.id">
                                                    {{ item.title }}
                                                </RouterLink>
                                            </span>
                                            <span class="col">
                                                {{ item.quantity }}
                                            </span>
                                            <span class="col">{{ item.price * item.quantity }} €</span>
                                            <hr />
                                        </div>
                                        <div class="row">
                                            <span class="col"></span>

                                            <h4 class="col">Total</h4>
                                            <h4 class="col">{{ total }} €</h4>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3>{{ $t('order.infosTitle') }}</h3>
                                    <div>
                                        <h4>{{ $t('order.deliveryAddress') }}</h4>
                                        <div class="row form-outline mb-4">
                                            <div class="group col-md-9">
                                                <input v-model="dAddress.street" class="form-control" type="text" :placeholder="$t('address.street')" required />
                                            </div>
                                            <div class="group col-md-3  form-outline">
                                                <input v-model="dAddress.number" class="form-control" type="text" :placeholder="$t('address.number')" required />
                                            </div>
                                        </div>
                                        <div class="row form-outline mb-4">
                                            <div class="group col-md-3">
                                                <input v-model="dAddress.postalCode" class="form-control" type="text" :placeholder="$t('address.postalCode')" required />
                                            </div>
                                            <div class="group col-md-9  form-outline">
                                                <input v-model="dAddress.city" class="form-control" type="text" :placeholder="$t('address.city')" required />
                                            </div>
                                        </div>
                                        <div class="group form-outline mb-4">
                                            <input v-model="dAddress.country" class="form-control" type="text" :placeholder="$t('address.country')" required />
                                        </div>
                                    </div>
                                    <div>
                                        <h4>{{ $t('order.paiementAddress') }}</h4>
                                        <input  v-on:change="setSameAddress" v-model="sameAddress" name="sameAddress" type="checkbox" v-bind:value="sameAddress" /><label>{{ $t('order.sameAddress') }}</label>
                                        <div v-if="!sameAddress">
                                            <div class="row form-outline mb-4">
                                                <div class="group col-md-9">
                                                    <input v-model="pAddress.street" class="form-control" type="text" :placeholder="$t('address.street')" required />
                                                </div>
                                                <div class="group col-md-3  form-outline">
                                                    <input v-model="pAddress.number" class="form-control" type="text" :placeholder="$t('address.number')" required />
                                                </div>
                                            </div>
                                            <div class="row form-outline mb-4">
                                                <div class="group col-md-3">
                                                    <input v-model="pAddress.postalCode" class="form-control" type="text" :placeholder="$t('address.postalCode')" required />
                                                </div>
                                                <div class="group col-md-9  form-outline">
                                                    <input v-model="pAddress.city" class="form-control" type="text" :placeholder="$t('address.city')" required />
                                                </div>
                                            </div>
                                            <div class="group form-outline mb-4">
                                                <input v-model="pAddress.country" class="form-control" type="text" :placeholder="$t('address.country')" required />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="text-center">
                                        <button class="btn btn-primary" :class="{ 'disabled': !validatedFieldsOrders }"
                                            @click="placeOrder">
                                            {{ $t('order.placeOrderBtn') }}
                                        </button>
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

    import { mapState } from 'vuex';

    export default {
        name: '',
        data(){
            return {
                status: '',
                sameAddress: true,
                dAddress: {
                    street:'',
                    number:'',
                    postalCode:'',
                    city:'',
                    country:''
                },
                pAddress: {
                    street:'',
                    number:'',
                    postalCode:'',
                    city:'',
                    country:''
                }
            }
        },
        created(){
            this.cart = this.$store.getters.getCart;
        },
        mounted(){
            // if(this.status != 'logged') this.$router.push('/shop/loginRegister');
        },
        computed: {
            ...mapState(["status"]),
            total: function(){
                var total = 0;
                this.cart.forEach(element => {
                    total += element.price * element.quantity;
                });
                return total;
            }
        },
        methods: {
            setSameAddress: function(){
                if(this.sameAddress) {
                    this.pAddress = this.dAddress;
                } else {
                    pAddress = {
                        street:'',
                        number:'',
                        postalCode:'',
                        city:'',
                        country:''
                    }
                }
            },
            displayCart(){
                this.cart = this.$store.getters.getCart;
                console.log(this.cart);
            },
        }
    }

</script>