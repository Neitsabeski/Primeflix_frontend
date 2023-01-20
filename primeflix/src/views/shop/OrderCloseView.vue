<template>
    <div class="orderClose">
        <section class="h-100 gradient-form">
            <div class="container py-5 h-100">
                <h1>{{ $t('orderClose.orderClose') }}</h1>
                <div class="row d-flex justify-content-center align-items-center h-100 pannel">
                    <div class="col-xl-10">
                        <div class="row g-0 d-flex justify-content-center">
                            <div class="col-lg-6 ">
                                <div class="text-center">
                                    <h2>
                                        <span v-if="state=='success'" class="card_title">{{ $t('orderClose.orderSuccess') }} !</span>
                                        <span v-if="state=='cancel'" class="card_title">{{ $t('orderClose.orderCancel') }} !</span>
                                    </h2>
                                </div>
                                <div class="text-center">
                                    <div v-if="state=='success'">
                                        <p>
                                            {{ $t('orderClose.paiementSuccess') }}
                                        </p>
                                    </div>
                                    <div v-if="state=='cancel'">
                                        <p>
                                            {{ $t('orderClose.paiementCancel') }}
                                        </p>
                                    </div>
                                </div>
                                <div class="text-center">
                                    <p>
                                        {{ $t('orderClose.checkOrders') }}
                                    </p>
                                    <button @click="myOrders()" class="btn btn-primary">{{ $t('orderClose.myOrdersBtn') }}</button>
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
        name: 'OrderClose',
        props: ['state'],
        methods: {
            myOrders: function(){
                this.$router.push('/shop/orders');
            }
        },
        mounted(){
            if(this.status != 'logged') this.$router.push('/shop/loginregister');
        },
        computed: {
            ...mapState(["status"]),
        },
    }

</script>
