<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExample05">
          <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link :to="{path: '/mainpage/'}">
              <h3 style="color: white;">KURA KUORA </h3>
            </router-link>
          </li>
          </ul>
          <button class="btn btn-danger" @click="doLogOut">
          <img src="@/assets/glyphicons-388-log-out.png" alt="">
            LOG OUT</button>
          <form class="form-inline my-2 my-md-0">
          <input class="form-control" type="text" placeholder="Search">
          </form>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  methods: {
    doLogOut (){
      localStorage.removeItem('userId')
      this.$router.push({name:'home'})
    }
  }
}
</script>

<style>

</style>
