<template>
    <footer class="text-muted">
        <div class="container">
            <div class="row">
                <div class="col">
                    <router-link class="nav-link" to="/contact">
                        <span class="footlink">{{ $t('contactLink')}}</span>
                    </router-link>
                    <router-link class="nav-link" to="/about">
                        <span class="footlink">{{ $t('aboutLink')}}</span>
                    </router-link>
                </div>
                <div>
                    <router-link class="nav-link" to="/">
                        <img src="../../assets/img/logo.svg" class="logo"/>
                    </router-link>
                    
                </div>
                <div class="md-6">
                    © 2022 Copyright: ISL Wenkin & Gardier
                </div>
            </div>
        </div>
    </footer>
</template>