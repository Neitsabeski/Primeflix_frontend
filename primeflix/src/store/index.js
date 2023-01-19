import { createStore } from 'vuex'
import i18n from '../i18n'
import utils from '@/helpers/utils'

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
        genres: [],

        //search
        searchText: '',

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
        alreadyConnected: function(state, isAdmin){

            state.user.token = localStorage.getItem('jwt');
            state.user.facebookToken = localStorage.getItem('facebookToken');

            if(state.user.facebookToken || state.user.token){
                if(state.user.facebookToken) {
                    this.dispatch('loginFacebook', state.user.facebookToken);
                } else if(state.user.token) {
                    this.dispatch('loginToken', state.user.token);
                }
                if(isAdmin){
                    this.commit('logOut');
                } else {
                    this.dispatch('cart', state.user.token);
                }
            }
        },
        logUser: function(state, data) {
            localStorage.setItem('jwt', data.token)
            state.user.token = data.token;
            state.user.role = data.role.name;
            state.user.id = data.id;
            state.user.data.firstName = data.firstName;
            state.user.data.lang = data.languageCode;
            this.commit('setLanguage', data.languageCode);
            this.dispatch('cart', state.user.token);
        },
        setUser: function(state, data){
            state.user.role = data.role.name;
            state.user.id = data.id;
            state.user.data.email = data.email;
            state.user.data.firstName = data.firstName;
            state.user.data.lastName = data.lastName;
            state.user.data.phone = data.phone;
            state.user.data.lang = data.language.code;
            this.commit('setLanguage', data.language.code);
        },
        logOut: function(state){
            state.user = {
                data: { 
                },
                role: 'customer',
                id: -1,
                token: ''
            },
            state.status = '';
            state.cart = [];
            state.cartCount = 0;
            localStorage.removeItem('jwt');
            localStorage.removeItem('facebookToken');
            localStorage.removeItem('cart');
            i18n.global.locale = 'en';
        },
        setFacebookToken(state, fbToken){
            console.log(fbToken);
        },
        setLanguage(state, langCode){
            i18n.global.locale = langCode;
        },

        // products
        setGenres: function(state, data){

            state.genres = data;
        },
        setProducts: function(state, data){
            state.products = data.products;
            state.totalPages = data.totalPages;
            state.currentPage = data.currentPage;
        },
        setFormat: function(state, format){
            state.format = format;
        },

        //search
        setSearchText: function(state, text){
            state.searchText = text;
        },

        // product
        setCurrentProduct(state, data){
            state.currentProduct = data;
        },
        
        // cart
        setCart: function(state, data){
            if(data[0].products.length > 0){
                state.cart = data[0].products;
                state.cartCount = state.cart.length;
            }
        },
        addToCart: function(state, product){
            let found = state.cart.find(item => item.id == product.id);
            if (found) {
                if(product.stock > found.quantity) {
                    found.quantity ++;
                }
            } else {
                if(product.stock > 0){
                    state.cart.push({ "id": product.id, "title": product.title, "price": product.price, "quantity": 1, "stock": product.stock});
                    state.cartCount ++;
                }
            }
            this.dispatch('saveCart',  { "cart": state.cart, "jwt": state.user.token});
        },
        removeFromCart: function(state, product){
            let found = state.cart.find(item => item.id == product.id);
            if (found) {
                if(1 < found.quantity) {
                    found.quantity --;
                } else {
                    var index = state.cart.indexOf(found);
                    state.cart.splice(index, 1);
                    state.cartCount --;
                }
            }
            this.dispatch('saveCart',  { "cart": state.cart, "jwt": state.user.token});
        },
        
    },
    getters: {

        // Filters
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

        // User
        getStatus: function(state){
            return state.status;
        },
        getUser: function(state){
            return state.user;
        },

        // Cart
        getCart: function(state){
            return state.cart;
        },
        getCartCount: function(state){
            return state.cartCount;
        },

        // Products
        getGenres: function(state){
            return state.genres;
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

        // Search
        getSearchText: function(state){
            return state.searchText;
        },

        // Product
        getCurrentProduct: function(state){
            return state.currentProduct;
        },
    },
    actions: {
        register: ({commit}, userInfos) => {
            commit('setStatus', 'loading');
            return new Promise(async (resolve, reject) => {
                await instance.post('/users/register', userInfos)
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
            return new Promise(async (resolve, reject) => {
                await instance.post('/users/login', { "email":userInfos.email, "password": userInfos.password})
                .then(function (response) {
                    if(userInfos.isAdmin == false && response.data.role.name == 'customer'){
                        commit('setStatus', 'logged');
                        commit('logUser', response.data);
                        resolve(response);
                    } else if(userInfos.isAdmin == true && response.data.role.name != 'customer'){
                        commit('setStatus', 'logged');
                        commit('logUser', response.data);
                        resolve(response);
                    } else {
                        commit('setStatus', 'error_login');
                        resolve(false);
                    }
                })
                .catch(function (error) {
                    commit('setStatus', 'error_login');
                    reject(error);
                });
            })
        },
        loginToken: ({commit}, jwt) => {

            commit('setStatus', 'loading');
            return new Promise(async (resolve, reject) => {
                await instance.post('/users/login/token', { "token": jwt })
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
        loginFacebook: ({commit}) => {
            const fbToken = { "token": localStorage.getItem("facebookToken")};
            return new Promise(async (resolve, reject) => {
                await instance.post('/users/login/facebook', fbToken)
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
            const headers = { "Authorization": "Bearer " + jwt };
            return new Promise(async (resolve, reject) => {
                await instance.get('/users', { headers })
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
        modifyProfile: ({commit}, data) => {
            const headers = { "Authorization": "Bearer " + data.jwt };
            const userInfos = data.infos;
            return new Promise((resolve, reject) => {
                instance.put('/users', userInfos, { headers })
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    reject(error);
                });
            })
        },
        genres: ({commit}) => {
            var query = '';
            query += utils.queryLang();
            return new Promise((resolve, reject) => {
                instance.get('/genres' + query)
                .then(function (response) {
                    commit('setGenres', response.data);
                    resolve(response);
                })
                .catch(function (error) {
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
        search: ({commit}, items) => {
            var query = '';
            query += utils.queryLang();
            query += utils.queryParams(items.params);
            return new Promise((resolve, reject) => {
                instance.get('/products/search/' + items.text + query)
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
            var query = '';
            query += utils.queryLang();
            return new Promise((resolve, reject) => {
                instance.get('/carts' + query, { headers })
                .then(function (response) {
                    commit('setCart', response.data)
                    resolve(response);
                })
                .catch(function (error) {
                    reject(error);
                });
            })
        },
        saveCart: ({commit}, data) => {
            const headers = { "Authorization": "Bearer " + data.jwt };
            const cart = utils.setCartStructure(data.cart);
            return new Promise((resolve, reject) => {
                instance.post('/carts', cart, { headers })
                .then(function (response) {
                    //commit('setCart', response.data)
                    resolve(response);
                })
                .catch(function (error) {
                    reject(error);
                });
            })
        },
        order: ({commit}, data) => {
            const headers = { "Authorization": "Bearer " + data.jwt };
            return new Promise((resolve, reject) => {
                instance.post('/payment/checkout', data.informations, { headers })
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    reject(error);
                });
            })
        },
    }
})

export default store;