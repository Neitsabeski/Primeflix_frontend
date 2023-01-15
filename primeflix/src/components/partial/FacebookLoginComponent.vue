<!--
<template>
    <div>
        <div class="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="true" scope="public_profile,email"  onLogin="checkLoginState"></div>
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
-->

<template>
    <div>
        <facebook-login class="button"
            appId="559856828979383"
            @login="getUserData"
            @logout="onLogout"
            @get-initial-status="getUserData">
        </facebook-login>
    </div>
    
</template>

<script>

    import vue from 'vue'
    import facebookLogin from 'facebook-login-vuejs';

    export default {
        components: {
            facebookLogin
        },
        methods: { 
            getUserData() {
                this.FB.api('/me', 'GET', { fields: 'id,name,email' },
                    userInformation => {
                    console.warn("data api",userInformation)
                    this.personalID = userInformation.id;
                    this.email = userInformation.email;
                    this.name = userInformation.name;
                    }
                )
            },
            sdkLoaded(payload) {
                this.isConnected = payload.isConnected
                this.FB = payload.FB
                if (this.isConnected) this.getUserData()
            },
            onLogin() {
                this.isConnected = true
                this.getUserData()
            },
            onLogout() {
                this.isConnected = false;
            }
        }
    }



</script>