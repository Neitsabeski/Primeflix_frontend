<template>
    <div class="orders">
        <section class="h-100 gradient-form">
            <div class="container py-5 h-100">
                <h1>{{ $t('orders.title') }}</h1>
                <div class="row d-flex justify-content-center align-items-center h-100 pannel">
                    <div class="col-xl-10">
                        <div class="row g-0 d-flex justify-content-center">
                            <div class="col-lg-6 ">
                                <div class="text-center">
                                    <h2 class="card_title">
                                        <span v-if="orders.length > 0">{{ $t('orders.subTitle')}}</span>
                                        <span v-else>{{ $t('orders.nothing')}}</span>
                                    </h2>
                                </div>
                            </div>

                            <div v-if="orders.length > 0">
                                <div class="row text-center">
                                    <div class="col">#</div>
                                    <div class="col">Date</div>
                                    <div class="col">Total</div>
                                    <div class="col">Status</div>
                                </div>
                                <div class="row accordion" id="accordion" v-for="order in orders">
                                    <div class="row text-center collapsed" data-bs-toggle="collapse" :data-bs-target="'#collapse'+order.id" aria-expanded="false" :aria-controls="'collapse'+order.id">
                                        <div class="col">{{ order.id }}</div>
                                        <div class="col">{{ dateFormat(order.date) }}</div>
                                        <div class="col">{{ order.total }} €</div>
                                        <div class="col">{{ order.status.name }}</div>
                                    </div>
                                    <div class="accordion-collapse collapse text-center" :id="'collapse'+order.id" :aria-labelledby="'collapse'+order.id" data-bs-parent="#accordion">
                                        <div class="row accordion-body" v-for="item in order.details">
                                            <div class="col">{{ item.product.id }}</div>
                                            <div class="col plink"><RouterLink :to='"/shop/products/"+item.product.id'>{{ item.product.title }}</RouterLink></div>
                                            <div class="col">{{ item.product.price }} €</div>
                                            <div class="col">{{ item.quantity }}</div>
                                        </div>
                                    </div>
                                    <hr/>
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
    import utils from '@/helpers/utils'

    export default {
        name: 'Orders',
        data() {
            return {
                orders: [
                    /*{
                        "id": 28,
                        "user": {
                            "id": 21,
                            "firstName": "Laurent",
                            "lastName": "Wenkin",
                            "phone": "0473333333",
                            "email": "laurent.wenkin@gmail.com"
                        },
                        "date": "2023-01-14T19:05:46",
                        "total": 5.0,
                        "status": {
                            "id": 2,
                            "name": "Paid"
                        },
                        "details": [
                            {
                                "product": {
                                    "id": 5,
                                    "title": "La liste de Schindler",
                                    "price": 5.0
                                },
                                "quantity": 1
                            }
                        ],
                        "shippingAddress": {
                            "street": "Rue Devant Les Ecoliers",
                            "number": "7",
                            "postalCode": "4020",
                            "city": "Liège",
                            "country": "Belgique"
                        },
                        "invoiceAddress": {
                            "street": "Rue Devant Les Ecoliers",
                            "number": "7",
                            "postalCode": "4020",
                            "city": "Liège",
                            "country": "Belgique"
                        }
                    },
                    {
                        "id": 30,
                        "user": {
                            "id": 21,
                            "firstName": "Laurent",
                            "lastName": "Wenkin",
                            "phone": "0473333333",
                            "email": "laurent.wenkin@gmail.com"
                        },
                        "date": "2023-01-14T19:05:46",
                        "total": 5.0,
                        "status": {
                            "id": 2,
                            "name": "Paid"
                        },
                        "details": [
                            {
                                "product": {
                                    "id": 5,
                                    "title": "La liste de Schindler",
                                    "price": 5.0
                                },
                                "quantity": 1
                            }
                        ],
                        "shippingAddress": {
                            "street": "Rue Devant Les Ecoliers",
                            "number": "7",
                            "postalCode": "4020",
                            "city": "Liège",
                            "country": "Belgique"
                        },
                        "invoiceAddress": {
                            "street": "Rue Devant Les Ecoliers",
                            "number": "7",
                            "postalCode": "4020",
                            "city": "Liège",
                            "country": "Belgique"
                        }
                    },
                    {
                        "id": 29,
                        "user": {
                            "id": 21,
                            "firstName": "Laurent",
                            "lastName": "Wenkin",
                            "phone": "0473333333",
                            "email": "laurent.wenkin@gmail.com"
                        },
                        "date": "2023-01-14T19:05:46",
                        "total": 5.0,
                        "status": {
                            "id": 2,
                            "name": "Paid"
                        },
                        "details": [
                            {
                                "product": {
                                    "id": 5,
                                    "title": "La liste de Schindler",
                                    "price": 5.0
                                },
                                "quantity": 1
                            }
                        ],
                        "shippingAddress": {
                            "street": "Rue Devant Les Ecoliers",
                            "number": "7",
                            "postalCode": "4020",
                            "city": "Liège",
                            "country": "Belgique"
                        },
                        "invoiceAddress": {
                            "street": "Rue Devant Les Ecoliers",
                            "number": "7",
                            "postalCode": "4020",
                            "city": "Liège",
                            "country": "Belgique"
                        }
                    },
                    {
                        "id": 32,
                        "user": {
                            "id": 21,
                            "firstName": "Laurent",
                            "lastName": "Wenkin",
                            "phone": "0473333333",
                            "email": "laurent.wenkin@gmail.com"
                        },
                        "date": "2023-01-14T19:05:46",
                        "total": 5.0,
                        "status": {
                            "id": 2,
                            "name": "Paid"
                        },
                        "details": [
                            {
                                "product": {
                                    "id": 5,
                                    "title": "La liste de Schindler",
                                    "price": 5.0
                                },
                                "quantity": 1
                            }
                        ],
                        "shippingAddress": {
                            "street": "Rue Devant Les Ecoliers",
                            "number": "7",
                            "postalCode": "4020",
                            "city": "Liège",
                            "country": "Belgique"
                        },
                        "invoiceAddress": {
                            "street": "Rue Devant Les Ecoliers",
                            "number": "7",
                            "postalCode": "4020",
                            "city": "Liège",
                            "country": "Belgique"
                        }
                    }
                    */
                ]
            }
        },
        mounted(){
            if(this.status != 'logged') this.$router.push('/shop/loginregister');
            this.getOrders();
        },
        computed: {
            ...mapState(["status"]),
        },
        methods: {
            dateFormat(date){
                return utils.formatDate(date);
            },
            getOrders: function() {
                const token = this.$store.getters.getUser.token;
                const self = this;
                this.$store.dispatch('orders', token
                ).then(function (response) {
                    self.orders = response;
                }, function (error) {
                    console.log(error);
                })
            }
        }
    }

</script>