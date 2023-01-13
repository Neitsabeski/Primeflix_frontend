import { createStore } from 'vuex'
import i18n from '../i18n'
import utils from '@/helpers/utils';

const axios = require('axios');

const instance = axios.create({
    //baseURL: 'https://virtserver.swaggerhub.com/SEBASTIENGARDIER/primeflix/1.0.0'
    //baseURL: 'https://localhost:5000/api/'
    baseURL: 'http://localhost:3000/'
});




// Create a new store instance.
const store = createStore({

    state: {
        status: '',
        
        user: {
            userId: -1,
            data: {},
            token: '',
        },
        
        products: [],
        totalPages: 1,
        currentPage: 1,
        pageSize: 5,

        lang: 'en',
        recentlyAdded: 'false',
        format: '',
        genre: '',
        
        currentProduct: null,
        
        cart: [],
        cartCount: 0,
    },
    mutations: {
        setLang: function(state){
            state.lang = i18n.global.locale;
        },
        setFormat: function(state, format){
            state.format = format;
        },
        setGenre: function(state, genre){
            state.genre = genre;
        },
        setRecentlyAdded: function(state, recentlyAdded){
            state.recentlyAdded = recentlyAdded;
        },

        setStatus: function(state, status) {
            state.status = status;
        },
        logUser: function(state, data) {
            state.user.userId = data[0].id;
            state.user.token = data[0].token;
            state.user.data.firstName = data[0].firstName;
            state.user.data.lastName = data[0].lastName;
            state.user.data.phone = data[0].phone;
            state.user.data.lang = data[0].lang;
            state.user.data.email = data[0].email;

            localStorage.setItem('jwt', data[0].token)
        },
        logOut: function(state){
            state.user.userId = -1;
            state.user.token  = '';
            state.user.data = {};
            state.status = '';

            localStorage.removeItem('jwt');
        },

        setProducts: function(state, data){
            state.products = data.products;
            state.totalPages = data.totalPages;
            state.currentPage = data.currentPage;
        },

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

        alreadyConnected: function(state){
            state.token = localStorage.getItem('jwt');
            if(state.token) {
                this.dispatch('user', state.token);
                this.dispatch('cart', state.token);
            }
        },

        setCurrentProduct(state, data){
            state.currentProduct = data[0];
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
                instance.get('/users', userInfos)
                .then(function (response) {
                    commit('setStatus', 'logged');
                    commit('logUser', response.data);
                    resolve(response);
                })
                .catch(function (error) {
                    commit('setStatus', 'error_login');
                    reject(error);
                });
            })
        },
        user: ({commit}, jwt ) => {

            const config = {
                headers: { Authorization: `Bearer ${jwt}` }
            };

            return new Promise((resolve, reject) => {
                instance.get('/users', config)
                .then(function (response) {
                    commit('setStatus', 'logged');
                    commit('logUser', response.data);
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
            //query += utils.queryLang();

            return new Promise((resolve, reject) => {
                instance.get('/product?id='+ productId + query)
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
            
            const config = {
                headers: { Authorization: `Bearer ${jwt}` }
            };

            return new Promise((resolve, reject) => {
                instance.get('/carts', config)
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

            const config = {
                headers: { Authorization: `Bearer ${jwt}` }
            };

            return new Promise((resolve, reject) => {
                instance.post('/carts', order, config)
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