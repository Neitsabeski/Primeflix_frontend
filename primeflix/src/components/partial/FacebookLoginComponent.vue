<template>
    <div>
        <a href="#" @click='doLogin' class="facebookBtn">
            <font-awesome-icon icon="fa-brands fa-facebook" /> Sign in using Facebook
        </a>
    </div>
</template> 
    
<script>

    
    import store from '../../store/index'
    import router from '../../router/index'

    export default {
        data() {
            return {
                status: '',
            }
        },
        mounted() {
            if (typeof FB === "undefined") {
                this.fbInit();
            }
        },
        methods: {
            fbInit(){
                
                window.fbAsyncInit = function() {
                    FB.init({
                        appId      : '559856828979383',
                        cookie     : true,
                        xfbml      : true,
                        version    : 'v15.0',
                    });
                };
                
                (function(d, s, id) {
                    var js,
                        fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) {
                        return;
                    }
                    js = d.createElement(s);
                    js.id = id;
                    js.src = "//connect.facebook.net/en_US/sdk.js";
                    fjs.parentNode.insertBefore(js, fjs);

                })(document, "script", "facebook-jssdk");
            },
            doLogin: function(){
                FB.login(function (loginResponse) {
                    var self = this;
                    if (loginResponse.status === 'connected') {
                        localStorage.facebookToken = localStorage.getItem("fblst_559856828979383");
                        store.dispatch('loginFacebook')
                        .then(function (response) {
                            router.push('/shop/profile');
                        }, function (error) {
                            console.log(error);
                            self.error = error.response.data;
                        })
                    }
                }, {
                    scope: 'email',
                    return_scopes: true
                });
            }
        }
    }
</script>
