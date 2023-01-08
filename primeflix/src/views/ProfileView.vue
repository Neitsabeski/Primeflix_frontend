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
                                        <div class="row"><div class="col pinky text-uppercase">{{ $t('profile.userID') }}</div><div class="col">{{ user.userId || emptyField }}</div></div>
                                        <hr/>
                                        <div class="row"><div class="col pinky text-uppercase">{{ $t('profile.firstName') }} </div><div class="col">{{ user.data.firstName || emptyField }}</div></div>
                                        <div class="row"><div class="col pinky text-uppercase">{{ $t('profile.lastName') }}</div><div class="col">{{user.data.lastName || emptyField }}</div></div>
                                        <hr/>
                                        <div class="row"><div class="col pinky text-uppercase">{{ $t('profile.phone') }}</div><div class="col">{{ user.data.phone || emptyField }}</div></div>
                                        <div class="row"><div class="col pinky text-uppercase">{{ $t('profile.email') }}</div><div class="col overflow-hidden">{{ user.data.email || emptyField }}</div></div>
                                        <hr/>
                                        <div class="row"><div class="col pinky text-uppercase">{{ $t('profile.paiementAddress') }}</div><div class="col">{{ user.data.paiementAddress || emptyField }}</div></div>
                                        <div class="row"><div class="col pinky text-uppercase">{{ $t('profile.deliveryAddress') }}</div><div class="col overflow-hidden">{{ user.data.deliveryAddress || emptyField }}</div></div>
                                        <hr/>
                                        <div class="row"><div class="col pinky text-uppercase">{{ $t('profile.language') }}</div><div class="col">{{ user.data.lang || emptyField }}</div></div>
                                        <hr/>
                                        <div class="row"><div class="col pinky text-uppercase">{{ $t('profile.token') }}</div><div class="col">{{ user.token || emptyField }}</div></div>
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

export default {
    name: 'Profile',
    data: function () {
        return {
            user: null,
            emptyField: 'NaN',
        }
    },
    created: function () {
        this.user = this.$store.getters.getUser;
        console.log(this.user);
        if (this.user.userId < 0) {
            this.$router.push('/loginRegister');
        } else {
            this.token = this.user.token;
        }
    }
}

</script>