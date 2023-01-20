<template>
  <div class="top text-center  mx-auto">
    <main class="form-signin">
        <img class="mb-4" src="../../assets/img/logo.png" alt="" width="72" height="57">

        <div class="form-floating">
          <input v-model="email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
          <label for="floatingPassword">Password</label>
        </div>

        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me"> Remember me
          </label>
        </div>
        <button class="w-100 btn btn-lg btn-primary" @click="signIn()">Sign in</button>
    </main>
  </div>
</template>

<style>

.top {
  position: relative;
  top: 75px;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>

<script>

  import { mapState } from 'vuex';

  export default {
    name: 'Login',
    data(){
      return {
        email: '',
        password: ''
      }
    },
    mounted(){
      if(this.status == 'logged') this.$router.push('/office');
    },
    computed: {
        ...mapState(["status"]),
    },
    methods: {
      signIn: function(event){
        const self = this;
        this.$store.dispatch('login', {
            email: this.email,
            password: this.password,
            isAdmin: true
        }).then(function (response) {
            self.$router.push('/office');
        }, function (error) {
            //console.log(error);
            self.error = error.response.state;
        })
      }
    }
  }

</script>