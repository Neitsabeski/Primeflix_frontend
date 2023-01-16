<template>
    <div>
        <div class="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="true" scope="public_profile,email"  @login="checkLoginState"></div>
    </div>
</template>
    
     
    
<script>


    export default {
        data() {
            return {
                status: '',
            }
        },
        mounted() {

            if (typeof FB === "undefined") {
                this.fbInit();
            } else {
                FB.XFBML.parse();
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
            
            checkLoginState: function() {

                console.log("Check");

                FB.getLoginStatus(function(response) {
                    if (response.status === 'connected') this.loginFacebook();
                });
            },
            loginFacebook: function(){
                console.log("go");
            }
        }
    }
</script>
