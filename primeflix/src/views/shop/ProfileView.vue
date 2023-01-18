<template>
    <div class="profile">
        <section class="h-100 gradient-form">
            <div class="container py-5 h-100">
                <h1>{{ $t('profile.title') }}</h1>
                <div class="row d-flex justify-content-center align-items-center h-100 pannel">
                    <div class="colxl-10">
                        <div class="row g-0 d-flex justify-content-center">
                            <div class="col-lg-6">
                                <div class="text-center">
                                    <h2 class="card_title">{{ $t('profile.subTitle') }}</h2>
                                </div>

                                <div class="row  mb-4 justify-content-center">
                                    <div class="col-md-8 text-center">
                                        <div class="d-flex flex-row-reverse">
                                            <span v-if="mode == 'read'" @click="switchMode" class="card_action">
                                                <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                                            </span>
                                            <span v-if="mode == 'edit'" @click="switchMode" class="card_action">
                                                <font-awesome-icon icon="fa-solid fa-circle-xmark" />
                                            </span>
                                            <span  v-if="mode == 'edit'" @click="saveInfos" class="card_action">
                                                <font-awesome-icon icon="fa-solid fa-floppy-disk" />
                                            </span>
                                            
                                        </div>
                                        
                                        <div class="row">
                                            <div class="col pinky text-uppercase">{{ $t('profile.firstName') }} </div>
                                            <div class="col">
                                                <div v-if="mode == 'read'">{{ user.data.firstName || emptyField }}</div>
                                                <div v-if="mode == 'edit'"><input v-model="firstname" class="form-control" type="text" :placeholder="user.data.firstName" required /></div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col pinky text-uppercase">{{ $t('profile.lastName') }}</div>
                                            <div class="col">
                                                <div>
                                                    <div v-if="mode == 'read'">{{user.data.lastName || emptyField }}</div>
                                                    <div v-if="mode == 'edit'"><input v-model="firstname" class="form-control" type="text" :placeholder="user.data.lastName" required /></div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div class="row">
                                            <div class="col pinky text-uppercase">{{ $t('profile.phone') }}</div>
                                            <div class="col">
                                                <div>
                                                    <div v-if="mode == 'read'">{{ user.data.phone || emptyField }}</div>
                                                    <div v-if="mode == 'edit'"><input v-model="phone" class="form-control" type="tel" :placeholder="user.data.phone" required /></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col pinky text-uppercase">{{ $t('profile.email') }}</div>
                                            <div class="col overflow-hidden">
                                                <div>{{ user.data.email || emptyField }}</div>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div class="row">
                                            <div class="col pinky text-uppercase">{{ $t('profile.language') }}</div>
                                            <div class="col">
                                                <div v-if="mode == 'read'">{{ user.data.lang || emptyField }}</div>
                                                <div v-if="mode == 'edit'">
                                                    <select v-model="lang" class="form-control" :value="user.data.lang">
                                                        <option value="fr">Français</option>
                                                        <option value="en">English</option>
                                                    </select>
                                                </div>
                                            </div>
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

    import { mapState } from 'vuex';

    export default {
        name: 'Profile',
        data: function () {
            return {
                mode: 'read',
                user: null,
                userModify: null,
                emptyField: 'NaN',
            }
        },
        created: function () {
            this.user = this.$store.getters.getUser;
        },
        mounted(){
            this.getUser();
            
            if(this.status != 'logged') this.$router.push('/shop/loginregister');
        },
        computed: {
            ...mapState(["status"]),
        },
        methods: {
            switchMode: function(){
                if(this.mode == 'read'){
                    this.userModify = this.user;
                    this.mode = 'edit';
                }
                else if(this.mode == 'edit') {
                    this.mode = 'read';
                    this.userModify = null;
                }
            },
            setUserStructure: function(){
                console.log(this.userModify);
                return {
                    "id": this.userModify.id,
                    "firstName": this.userModify.data.firstName,
                    "lastName": this.userModify.data.lastName,
                    "phone": this.userModify.data.phone,
                    "email": this.userModify.data.email,
                    "languageCode": this.userModify.data.lang,
                    //adresse
                };
            },
            saveInfos: function(){
                const self = this;
                this.$store.dispatch('modifyProfile', {
                    "infos": this.setUserStructure(),
                    "jwt": this.user.token
                })
                .then(function (response) {
                    
                }, function (error) {
                    //console.log(error);
                });
                this.switchMode();
            },
            getUser: function () {
                const self = this;
                this.$store.dispatch('user', this.user.token)
                .then(function (response) {
                    //console.log(response);
                    self.user = self.$store.getters.getUser;
                }, function (error) {
                    //console.log(error);
                })
            }
        }

    }

</script>