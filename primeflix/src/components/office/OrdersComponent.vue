<template>
    <div class="ordersComponent">
        <div class="display">
            <table class="table">
                <thead>
                    <tr>
                        <th class="col-md-1">#</th>
                        <th class="col-md-2">Date</th>
                        <th class="col-md-2">Customer</th>
                        <th class="col-md-2">Products</th>
                        <th class="col-md-2">Total</th>
                        <th class="col-md-1">Status</th>
                        <th class="col-md-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in orders">
                        <th scope="row">{{ order.id }}</th>
                        <td>{{ setDate(order.date) }}</td>
                        <td>{{ order.user.firstName }} {{ order.user.lastName }}</td>
                        <td>{{ order.details.length }}</td>
                        <td>{{ order.total }} €</td>
                        <td>{{ order.status.name }}</td>
                        <td>
                            <span class="" @click="edit(order.id)"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></span>
                        </td>
                    </tr> 
                </tbody>
            </table>
        </div>
        <div class="d-flex">
            <button class="btn btn-dashboard" @click="getUsers"><font-awesome-icon icon="fa-solid fa-arrows-rotate" /> Refresh</button>
            <button class="btn btn-dashboard"><font-awesome-icon icon="fa-solid fa-plus" /> Add</button>            
        </div>
    </div>
</template>

  
<script>

    import utils from '@/helpers/utils'

    export default {
        name: 'Orders',
        data(){
            return{
                mode: 'read',

                order: {},
                orders: [],
            }
        },
        mounted(){
            this.getOrders();
        },
        methods:{
            switchToRead(){
                this.mode = 'read';
            },
            switchToEdit(){
                this.mode = 'edit';
            },
            setDate(date){
                return utils.formatDate(date);
            },
            getOrders(){
                const self = this;
                this.$store.dispatch('orders', this.$store.getters.getUser.token
                ).then(function (response) {
                    self.orders = response;
                }, function (error) {
                    console.log(error);
                })
            },
            edit(id){
                alert(id);
            }
        }
    }

</script>