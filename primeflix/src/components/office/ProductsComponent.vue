<template>
    <div class="productsComponent">
        <div class="display">
            <table class="table">
                <thead>
                    <tr>
                        <th class="col-md-0">#</th>
                        <th class="col-md-6">Title</th>
                        <th class="col-md-0">Catalog</th>
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
                        <td>
                            <span class="custom-checkbox">
                                <input type="checkbox" id="checkbox1" name="options[]" value="1">
                                <label for="checkbox1"></label>
                            </span>
                        </td>
                        <td>{{ setDate(product.releaseDate) }}</td>
                        <td>{{ product.stock }}</td>
                        <td>{{ product.price }}</td>
                        <td>{{ product.format.name }}</td>
                        <td>
                            <span class="" @click="edit(product.id)"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></span>
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
            <button class="btn btn-dashboard"><font-awesome-icon icon="fa-solid fa-plus" /> Add</button>
            <button class="btn btn-dashboard"><font-awesome-icon icon="fa-solid fa-file-csv" /> Import .CSV</button>
        </div>
    </div>
</template>

  
<script>

    import utils from '@/helpers/utils'

    export default {
        name: 'Products',
        data(){
            return{
                mode: 'read',

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
            switchToImport(){
                this.mode = 'import';
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
            getProduct(){

            },
            setProduct(){

            },
            edit(id){
                alert(id);
            }
        }
    }

</script>