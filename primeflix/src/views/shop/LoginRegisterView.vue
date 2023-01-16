<template>
    <div class="loginregister">

        <section class="h-100 gradient-form">
            <div class="container py-5 h-100">
                <h1>{{ $t('loginRegister.title') }}</h1>
                <div class="row d-flex justify-content-center align-items-center h-100 pannel">
                    <div class="col-xl-10">

                        <div class="row g-0 d-flex justify-content-center">
                            <div class="col-lg-6 ">

                                <!-- Titles section -->
                                <div class="text-center">
                                    <h2 class="card_title">
                                        <span v-if="mode == 'login'">{{ $t('loginRegister.loginSubTitle') }}</span>
                                        <span v-else>{{ $t('loginRegister.registerSubTitle') }}</span>
                                    </h2>

                                    <p class="card_subtitle">
                                        <span v-if="mode == 'login'">
                                            {{ $t('loginRegister.noAccount') }}<span class="card_action" @click="switchToRegister">{{ $t('loginRegister.registerHere') }}</span>
                                        </span>
                                        <span v-else>
                                            {{ $t('loginRegister.alreadyAccount') }}<span class="card_action" @click="switchToLogin"> {{ $t('loginRegister.loginHere') }}</span>
                                        </span>
                                    </p>
                                </div>

                                <!-- Email section -->
                                <div class="group form-outline mb-4">
                                    <input v-model="email" class="form-control" type="email" :placeholder="$t('loginRegister.emailField')" required />
                                </div>

                                <!-- Names section -->
                                <div class="row form-outline mb-4" v-if="mode == 'register'">
                                    <div class="group col-md-6">
                                        <input v-model="firstname" class="form-control" type="text" :placeholder="$t('loginRegister.firstNameField')" required />
                                    </div>
                                    <div class="group col-md-6  form-outline">
                                        <input v-model="lastname" class="form-control" type="text" :placeholder="$t('loginRegister.lastNameField')" required />
                                    </div>
                                </div>

                                <!-- Phone section -->
                                <div class="group form-outline mb-4" v-if="mode == 'register'">
                                    <input v-model="phone" class="form-control" type="tel" :placeholder="$t('loginRegister.phoneField')" required />
                                </div>

                                <!-- Langue section -->
                                <div class="group form-outline mb-4" v-if="mode == 'register'" required>
                                    <select v-model="lang" class="form-control">
                                        <option value="" disabled>{{ $t('loginRegister.languageSelect') }}</option>
                                        <option value="fr">Français</option>
                                        <option value="en">English</option>
                                    </select>
                                </div>

                                <!-- Password section -->
                                <div class="group form-outline mb-4">
                                    <input v-model="password" class="form-control" type="password" :placeholder="$t('loginRegister.passwordField')" required />
                                </div>

                                <!-- Password Verification section -->
                                <div class="group form-outline mb-4" v-if="mode == 'register'">
                                    <input v-model="passwordverification" class="form-control" type="password" :placeholder="$t('loginRegister.passwordVerifField')" />
                                </div>

                                <!-- Buttons section -->
                                <div class="d-flex justify-content-center group form-outline mb-4">
                                    <div v-if="mode == 'login' && status == 'error_login'">
                                        <span>
                                            {{ $t('loginRegister.badLog') }}
                                        </span>
                                    </div>
                                    <div v-if="mode == 'register' && status == 'error_login'">
                                        <span>
                                            {{ $t('loginRegister.badReg') }}
                                        </span>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-center group form-outline mb-4">
                                    <div v-if="mode == 'login'">
                                        <button class="btn btn-primary" :class="{ 'disabled': !validatedFields }"
                                            @click="login">
                                            <span v-if="status == 'loading'">{{ $t('loginRegister.loginBtn') }} ...</span>
                                            <span v-else>{{ $t('loginRegister.loginBtn') }}</span>
                                        </button>
                                        <span @click="recover">{{ $t('loginRegister.forgotPassword') }}</span>
                                        <hr/>
                                        <div class="d-flex justify-content-center group form-outline mb-4">
                                            <FBLogComp/>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <button class="btn btn-primary" :class="{ 'disabled': !validatedFields }"
                                            @click="register">
                                            <span v-if="status == 'loading'">{{ $t('loginRegister.registerBtn') }} ...</span>
                                            <span v-else>{{ $t('loginRegister.registerBtn') }}</span>
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

    import FBLogComp from '@/components/partial/FacebookLoginComponent.vue'
    import { mapState } from 'vuex';
    import utils from '../../helpers/utils';


    export default {
        name: 'LoginRegister',
        components: {
            FBLogComp
        },
        data: function () {
            return {
                mode: 'login',
                email: '',
                firstname: '',
                lastname: '',
                phone: '',
                lang: '',
                password: '',
                passwordverification: ''
            }
        },
        mounted(){
            if(this.status == 'logged') this.$router.push('/shop/profile');
        },
        computed: {
            validatedFields: function () {
                if (this.mode == 'register') {
                    if (utils.ValidateEmail(this.email)
                        && utils.ValidateName(this.firstname)
                        && utils.ValidateName(this.lastname)
                        && this.lang != ""
                        && utils.ValidatePhone(this.phone)
                        && utils.ValidatePassword(this.password)
                        && this.password == this.passwordverification) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    if (this.email != ""
                        && this.password != "") {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            ...mapState(["status"])
        },
        methods: {
            switchToRegister: function () {
                this.mode = 'register';
            },
            switchToLogin: function () {
                this.mode = 'login';
            },
            login: function (event) {

                //utils.hashSha256(this.password);

                const self = this;
                this.$store.dispatch('login', {
                    email: this.email,
                    password: this.password
                }).then(function (response) {
                    console.log(response);
                    self.$router.push('/shop/profile');
                }, function (error) {
                    console.log(error);
                })
            },
            register: function () {
                const self = this;
                this.$store.dispatch('register', {
                    email: this.email,
                    firstName: this.firstname,
                    lastName: this.lastname,
                    phone: this.phone,
                    lang: this.lang,
                    password: this.password
                }).then(function (response) {
                    //console.log(response);
                    self.login();
                }, function (error) {
                    //console.log(error);
                })
            }
        }
    }

</script>