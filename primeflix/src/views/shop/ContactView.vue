<template>
    <div class="contact">
        <section class="h-100 gradient-form">
            <div class="container py-5 h-100">
                <h1>{{ $t('contact.title')}}</h1>
                <div class="row d-flex justify-content-center align-items-center h-100 pannel">
                    <div class="col-xl-10">
                        <div class="row g-0 d-flex justify-content-center">
                            <div class="col-lg-6 ">
                                <div class="text-center">
                                    <h2 class="card_title">{{ $t('contact.subTitle')}}</h2>
                                </div>
                                <div v-if="mode == 'form'">

                                    <!-- Email section -->
                                    <div class="group form-outline mb-4">
                                        <input v-model="email" class="form-control" type="email" v-bind:placeholder="$t('contact.placeholderEmail')" required />
                                    </div>

                                    <!-- Name section -->
                                    <div class="form-outline mb-4">
                                        <input v-model="fullname" class="form-control" type="text" v-bind:placeholder="$t('contact.placeholderFullName')" required />
                                    </div>

                                    <!-- Subjects section -->
                                    <div class="form-outline mb-4">
                                        <input v-model="subject" class="form-control" type="text" v-bind:placeholder="$t('contact.placeholderSubject')" required />
                                    </div>

                                    <!-- Message section -->
                                    <div class="form-outline mb-4">
                                        <div class="md-form">
                                            <textarea v-model="message" type="text" rows="5" class="form-control md-textarea"  v-bind:placeholder="$t('contact.placeholderMessage')"></textarea>
                                        </div>
                                    </div>
                                    <!-- Button section -->
                                    <div class="d-flex justify-content-center group form-outline mb-4">
                                        <button class="btn btn-primary" :class="{ 'disabled': !validatedFields }" @click="send">
                                            {{ $t('contact.sendBtn')}}
                                        </button>
                                    </div>
                                </div>
                                <div v-else>
                                    <!-- Button section -->
                                    <div class="d-flex justify-content-center group form-outline mb-4">
                                        <p>
                                            {{ $t('contact.sendedMessage') }}
                                        </p>
                                        <button class="btn btn-primary" @click="switchToForm">
                                            {{ $t('contact.backBtn')}}
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

    import utils from '@/helpers/utils';

    export default {
        name: 'About',
        data() {
            return {
                mode: 'form',
                email: '',
                fullname: '',
                subject: '',
                message: ''
            }
        },
        computed: {
            validatedFields: function () {              
                if (utils.ValidateEmail(this.email)
                    && utils.ValidateFullName(this.fullname)
                    && utils.ValidateText(this.subject)
                    && utils.ValidateText(this.message)
                    ) {
                    return true;
                } else {
                    return false;
                }
            },
            invalidEmail: function(){
                if (utils.ValidateEmail(this.email)){
                    
                }
            }
        },
        methods: {
            switchToForm: function(){
                this.mode = 'form';
            },
            switchToSended: function(){
                this.mode = 'messageSended';
            },
            send: function (event) {

                this.email = '';
                this.fullname = '';
                this.subject = '';
                this.message = '';

                this.switchToSended();
                /*
                const self = this;
                this.$store.dispatch('contactMessage', {
                    email: this.email,
                    password: this.password
                }).then(function (response) {
                    this.mode = 'messageSended';
                }, function (error) {
                    console.log(error);
                })
                */
            },
        }
    }
</script>