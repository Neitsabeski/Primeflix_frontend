import { createStore } from 'vuex'
import i18n from '../i18n'
import utils from '@/helpers/utils';

const axios = require('axios');

const instance = axios.create({
    //baseURL: 'https://virtserver.swaggerhub.com/SEBASTIENGARDIER/primeflix/1.0.0'
    baseURL: 'https://localhost:5000/api/'
    //baseURL: 'http://localhost:3000/'
});

// Create a new store instance.
const store = createStore({

    state: {
        // user status
        status: '',
        
        // user
        user: {
            data: { 
            },
            role: '',
            id: -1,
            token: '',
        },
        
        // products
        products: [],
        totalPages: 1,
        currentPage: 1,
        pageSize: 5,
        format: '',
        
        // product
        currentProduct: null,

        // cart
        cart: [],
        cartCount: 0,
    },
    mutations: {
        // user status
        setStatus: function(state, status) {
            state.status = status;
        },

        // login register
        alreadyConnected: function(state){
            state.user.token = localStorage.getItem('jwt');
            if(state.user.token != null) {
                this.dispatch('user', state.user.token);
                if(state.user.role != 'client'){
                    this.logOut;
                } else {
                    this.dispatch('cart', state.user.token);
                }
            }
        },
        logUser: function(state, data) {
            console.log("logUser data : " + data);
            
            localStorage.setItem('jwt', data.token)
            state.user.token = data.token;
            state.user.role = data.role.name;
            state.user.id = data.id;

            state.user.data.firstName = data.firstName;
            state.user.data.lang = data.language;
            console.log("state.user : " + state.user);
        },
        setUser: function(state, data){
            state.user.role = data.role.name;
            state.user.id = data.id;
            state.user.data.email = data.email;
            state.user.data.firstName = data.firstName;
            state.user.data.lastName = data.lastName;
            state.user.data.address = data.address;
            state.user.data.phone = data.phone;
            state.user.data.lang = data.language.code;
        },
        logOut: function(state){
            state.user = {
                data: { 
                },
                role: '',
                id: -1,
                token: ''
            },
            state.status = '';

            localStorage.removeItem('jwt');
            localStorage.removeItem('cart');
        },
        setFacebookToken(state, fbToken){
            console.log(fbToken);
        },

        // products
        setProducts: function(state, data){
            state.products = data.products;
            state.totalPages = data.totalPages;
            state.currentPage = data.currentPage;
        },
        setFormat: function(state, format){
            state.format = format;
        },

        // product
        setCurrentProduct(state, data){
            state.currentProduct = data;
        },
        
        // cart
        setCart: function(state, data){
            state.cart = data['products'];
            state.cartCount = state.cart.length;
        },
        addToCart: function(state, product){

            let found = state.cart.find(item => item.product.id == product.id);

            if (found) {
                if(product.stock > found.quantity) {
                    found.quantity ++;
                    state.cartCount ++;
                }
            } else {
                if(product.stock > 0){
                    state.cart.push({"product": product, "quantity": 1});
                    state.cartCount ++;
                }
            }

            localStorage.cart = state.cart;
        },
    },
    getters: {
        getLang: function(state){
            return state.lang;
        },
        getFormat: function(state){
            return state.format;
        },
        getGenre: function(state){
            return state.genre;
        },
        getRecentlyAdded: function(state){
            return state.recentlyAdded;
        },

        getStatus: function(state){
            return state.status;
        },
        getUser: function(state){
            return state.user;
        },

        getCart: function(state){
            return state.cart;
        },
        getCartCount: function(state){
            return state.cartCount;
        },

        getProducts: function(state){
            return state.products;
        },
        getCurrentPage: function(state){
            return state.currentPage;
        },
        getTotalPages: function(state){
            return state.totalPages;
        },

        getCurrentProduct: function(state){
            return state.currentProduct;
        },
        
    },
    actions: {
        register: ({commit}, userInfos) => {
            commit('setStatus', 'loading');

            console.log(userInfos);

            return new Promise((resolve, reject) => {
                instance.post('/users/register', userInfos)
                .then(function (response) {
                    commit('setStatus', 'created');
                    resolve(response);
                })
                .catch(function (error) {
                    commit('setStatus', 'error_register');
                    reject(error);
                });
            })
        },
        login: ({commit}, userInfos) => {

            commit('setStatus', 'loading');
            return new Promise((resolve, reject) => {
                instance.post('/users/login', userInfos)
                .then(function (response) {
                    commit('setStatus', 'logged');
                    commit('logUser', response.data);
                    //this.dispatch('user', response.data.token)
                    resolve(response);
                })
                .catch(function (error) {
                    commit('setStatus', 'error_login');
                    reject(error);
                });
            })
        },
        loginFacebook: ({commit}) => {

            const fbToken = { "token": localStorage.get("fblst_559856828979383")};

            return new Promise((resolve, reject) => {
                instance.post('/users/login/facebook', fbToken)
                .then(function (response) {
                    commit('logUser', response.data);
                    resolve(response);
                })
                .catch(function (error) {
                    reject(error);
                });
            })
        },
        user: ({commit}, jwt ) => {

            const headers = { "Authorization": "Bearer " + jwt };

            return new Promise((resolve, reject) => {
                instance.get('/users', { headers })
                .then(function (response) {
                    commit('setStatus', 'logged');
                    commit('setUser', response.data[0]);
                    resolve(response);
                })
                .catch(function (error) {
                    commit('setStatus', 'error_login');
                    reject(error);
                });
            })
        },
        products: ({commit}, params) => {

            var query = '';
            query += utils.queryLang();
            query += utils.queryParams(params);

            return new Promise((resolve, reject) => {
                instance.get('/products' + query)
                .then(function (response) {
                    commit('setProducts', response.data);
                    
                    resolve(response);
                })
                .catch(function (error) {
                    reject(error);
                });
            })
        },
        product: ({commit}, productId) => {
            
            var query = '';
            query += utils.queryLang();

            return new Promise((resolve, reject) => {
                instance.get('/products/'+ productId + query)
                .then(function (response) {
                    commit('setCurrentProduct', response.data);
                    resolve(response);
                })
                .catch(function (error) {
                    reject(error);
                });
            })
        },
        cart: ({commit}, jwt) => {
            
            const headers = { "Authorization": "Bearer " + jwt };

            return new Promise((resolve, reject) => {
                instance.get('/carts', { headers })
                .then(function (response) {
                    commit('setCart', response.data)
                    resolve(response);
                })
                .catch(function (error) {
                    reject(error);
                });
            })
        },
        order: ({commit}, order, jwt) => {

            const headers = { "Authorization": "Bearer " + jwt };

            return new Promise((resolve, reject) => {
                instance.post('/carts', order, { headers })
                .then(function (response) {
                    commit('setCart', response.data)
                    resolve(response);
                })
                .catch(function (error) {
                    reject(error);
                });
            })
        },
    }
})

export default store;