import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store' 

import axios from 'axios' 
import VueAxios from 'vue-axios'

import i18n from './i18n'

import 'bootstrap';
import './assets/scss/app.scss'

import FontAwesomeIcon from "@/helpers/fontAwsome";

createApp(App)
    .component("FontAwesomeIcon", FontAwesomeIcon)
    .use(i18n)
    .use(store)
    .use(VueAxios, axios)
    .use(router)
.mount('#app')