<template>
    <div class="stockComponent">
        <div>
            <div class="display">
                <table class="table">
                    <thead>
                        <tr>
                            <th class="col-md-0">#</th>
                            <th class="col-md-6">Title</th>
                            <th class="col-md-2">Realease date</th>
                            <th class="col-md-1">Stock</th>
                            <th class="col-md-1">Price</th>
                            <th class="col-md-2">Format</th>
                            <th class="col-md-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in products">
                            <th scope="row">{{ product.id }}</th>
                            <td>{{ product.title }}</td>
                            <td>{{ setDate(product.releaseDate) }}</td>
                            <td>{{ product.stock }}</td>
                            <td>{{ product.price }}</td>
                            <td>{{ product.format.name }}</td>
                            <td>
                                <span :id="'btnEdit'+product.id" @click="edit(product.id)"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></span>
                            </td>
                        </tr> 
                    </tbody>
                </table>
            </div>
            
            
            <div class="d-flex flex-row-reverse">
                <span class="btn-next" @click="changePage('+')"><font-awesome-icon icon="fa-solid fa-circle-chevron-right" /></span>
                <span>{{ currentPage }}/{{ totalPages }}</span>
                <span class="btn-previous" @click="changePage('-')"><font-awesome-icon icon="fa-solid fa-circle-chevron-left" /></span>
            </div>
            <div class="d-flex">
                <button class="btn btn-dashboard" @click="getProducts"><font-awesome-icon icon="fa-solid fa-arrows-rotate" /> Refresh</button>
            </div>
        </div>
    </div>
</template>

  
<script>

    import utils from '@/helpers/utils'

    export default {
        name: 'Products',
        data(){
            return{

                products: [],
                currentPage: 0,
                totalPages: 0,
                product: {},

                params: {
                    format:'All',
                    recentlyAdded: 'false',
                    pageSize: 10,
                    page: 1
                },
            }
        },
        mounted(){
            this.getProducts();
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
            changePage: function (char) {
                switch (char) {
                    case '-':
                        if(this.params.page > 1){
                            this.params.page -= 1;
                            this.getProducts();
                        }
                        break;
                    case '+':
                        if(this.params.page < this.totalPages){
                            this.params.page += 1;
                            this.getProducts();
                        }
                        break;
                    default:
                }
            },
            getProducts(){
                const self = this;
                this.$store.dispatch('products', this.params
                ).then(function (response) {
                    self.products = response.data.products;
                    self.currentPage = response.data.currentPage;
                    self.totalPages = response.data.totalPages;
                }, function (error) {
                    console.log(error);
                })
            },
            edit(id){
                this.switchToEdit();
            }
        }
    }

</script>