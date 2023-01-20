<template>
    <div class="customersComponent">
        <div class="display">
            <table class="table">
                <thead>
                    <tr>
                        <th class="col-md-0">#</th>
                        <th class="col-md-2">FirstName</th>
                        <th class="col-md-2">LastName</th>
                        <th class="col-md-3">Email</th>
                        <th class="col-md-2">Phone</th>
                        <th class="col-md-1">Language</th>
                        <th class="col-md-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in customers">
                        <th scope="row">{{ user.id }}</th>
                        <td>{{ user.firstName }}</td>
                        <td>{{ user.lastName }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.phone }}</td>
                        <td>{{ user.language.code }}</td>
                        <td>
                            <span class="" @click="edit(user.id)"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></span>
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

    export default {
        name: 'Customers',
        data(){
            return{
                mode: 'read',

                user: {},
                users: [],
            }
        },
        mounted(){
            this.getUsers();
        },
        computed: {
            customers: function(){
                return this.users.filter(i => i.role.name === 'customer');
            }
        },
        methods:{
            switchToRead(){
                this.mode = 'read';
            },
            switchToEdit(){
                this.mode = 'edit';
            },
            getUsers(){
                const self = this;
                this.$store.dispatch('user', this.$store.getters.getUser.token
                ).then(function (response) {
                    self.users = response.data;
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