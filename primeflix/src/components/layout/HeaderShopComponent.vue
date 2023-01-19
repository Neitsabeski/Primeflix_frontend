<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container-fluid">
      <div class="nav-link navbar-brand">
        <router-link to="/">P R I M E F L I X</router-link>
      </div>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="justify-content-center align-items-center navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <div class="nav-link">
              <router-link to="/">
                {{ $t('homeLink')}}
              </router-link>
            </div>
          </li>
          <li class="nav-item">
            <div class="nav-link">
              <router-link to="/shop/products" @click="setFormat(''), refresh()">
                {{ $t('productsLink')}}
              </router-link>
            </div>
          </li>
          <li class="nav-item">
            <div class="nav-link" >
                <router-link to="/shop/products" @click="setFormat('film'), refresh()">
                  {{ $t('filmsLink')}}
                </router-link>
            </div>
          </li>
          <li class="nav-item">
            <div class="nav-link">
              <router-link to="/shop/products" @click="setFormat('serie'), refresh()">
                {{ $t('seriesLink')}}
              </router-link>
            </div>
          </li>
          <li class="nav-item">
              <div class="nav-link notReady">
                {{ $t('offersLink')}}
              </div>
          </li>
        </ul>
        <ul class="d-flex justify-content-center align-items-center navbar-nav">
          
          <div class="nav-item">
            <div class="d-flex me-2">
              <input v-model="searchField" class="form-control" type="search" v-bind:placeholder="$t('searchField')" aria-label="Search">
              <button class="btn btn-primary" @click="search">
                  <font-awesome-icon icon="search" />
              </button>
            </div>
          </div>
          
          <li class="nav-item">
            <LocaleSwitcher @langChange="refresh()"/>
          </li>
          
          <li class="nav-item">
            <div class="nav-link">
                <router-link to="/shop/cart">
                  {{ $t('cartLink')}} <font-awesome-icon icon="shopping-cart" />(<span class="pinky">{{ this.$store.state.cartCount }}</span>)
                </router-link>
              </div>
          </li>

          <li class="nav-item">
            <div v-if="status != 'logged'" class="nav-link">
              <router-link to="/shop/loginregister">
                {{ $t('loginRegisterLink')}} <span class="pinky"><font-awesome-icon icon="sign-in" /></span>
              </router-link>
            </div>
            
            <div v-if="status == 'logged'" class="nav-link">
              <ul class="navbar-nav">                
                <li class="nav-item dropdown">
                  <a class="dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {{ user.data.firstName || "User" }}<span class="pinky"><font-awesome-icon icon="user" /></span>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end" >
                    <li>
                      <router-link to="/shop/profile">
                        {{ $t('profileLink')}}
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/shop/orders">
                        {{ $t('ordersLink')}}
                      </router-link>
                    </li>
                    <li>
                      <span class="card_action" @click="logOut">
                        {{ $t('logoutLink')}}
                      </span>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>

    import LocaleSwitcher from "../partial/LocaleSwitcher.vue";
    import { mapState } from 'vuex';

    export default {
      components: { LocaleSwitcher, LocaleSwitcher },
      data: function() {
        return {
          user: '',
          name: '',
          searchField: '',
          iteration: 0
        }
        
      },
      computed: {
          ...mapState(["status"]),
      },
      mounted() {
        this.user = this.$store.getters.getUser;
      },
      methods: {
        search: function(event){
          this.iteration ++;
          this.$store.commit('setSearchText', this.searchField);
          this.searchField = '';  
          this.$router.push({ path:'/shop/search'});
          this.refresh();
        },
        refresh(){
          this.$emit('refresh');
        },
        setFormat(format){
          this.$store.commit('setFormat', format)
        },
        logOut(){
          this.$store.commit('logOut');
          this.$router.push('/shop/loginRegister');
        }
      }
    }

</script>