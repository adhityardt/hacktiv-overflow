<template>
  <div class="login-form">
    <form class="form-signin">
      <img class="mb-4" src="@/assets/kura-kuora-logo.png" alt="" width="150" height="150">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label class="sr-only">Email address</label>
      <input type="email" id="inputEmail" class="form-control" placeholder="Email address" v-model="email">
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="password">
      <input type="checkbox" @click="showPassword">Show Password
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-danger btn-block" type="submit" @click="signIn">Sign in</button>
      <a data-toggle="modal" data-target="#registerModal" href="">Register</a>
      <p class="mt-5 mb-3 text-muted">© 2017-2018</p>
    </form>
    <div class="modal fade" id="registerModal" tabindex="-1" role="dalog" aria-labelledby="registerModalLaber" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Create a new account</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="form-signin">
              <img class="mb-4" src="@/assets/kura-kuora-logo.png" alt="" width="150" height="150">
              <h1 class="h3 mb-3 font-weight-normal">Please fill the form</h1>
              <label for="inputFullName" class="sr-only">Full Name</label>
              <input type="text" id="inputFullName" class="form-control" placeholder="Input your full name" v-model="fullname">
              <label class="sr-only">Email address</label>
              <input type="email" class="form-control" placeholder="Email address" v-model="emailRegister">
              <label class="sr-only">Password</label>
              <input type="password" id="inputPasswordRegister" class="form-control" placeholder="Password" v-model="passwordRegister">
              <input type="checkbox" @click="showPasswordRegister">Show Password
              <button class="btn btn-lg btn-danger btn-block" type="submit" @click="signUp" data-dismiss="modal">Register</button>
            </form>
          </div>
          <div class="modal-footer" style="text-align:center;">
            <p class="mt-5 mb-3 text-muted">© 2017-2018 </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'loginandregister',
  data () {
    return {
      email: '',
      password: '',
      emailRegister: '',
      passwordRegister: '',
      fullname:''
    }
  },
  methods: {
    signIn () {
      let payload = {
        email: this.email,
        password: this.password
      }
      this.logIn(payload)
    },
    signUp () {
      let payload = {
        name: this.fullname,
        email: this.emailRegister,
        password: this.passwordRegister
      }
      this.register(payload)
    },
    showPassword () {
      var x = document.getElementById("inputPassword");
      var y = document.getElementById("inputPasswordRegister");
      if (x.type === "password") {
          x.type = "text";
      } 
      else {
          x.type = "password";
      }
    },
    showPasswordRegister () {
      var y = document.getElementById("inputPasswordRegister");
      if (y.type === "password") {
          y.type = "text";
      } else {
          y.type = "password";
      } 
    },
    ...mapActions([
      'logIn',
      'register'
    ])
  },
  created () {
    if (localStorage.getItem('userId')) {
      this.$router.push({ name: 'mainpage' })
    } else {
      this.$router.push({ name: 'home'})
    }
  }
}
</script>

<style>
.login-form{
  display: flex;
  justify-content: center;
}
.modal-footer{
  display: flex;
  justify-content: center;
}
</style>
