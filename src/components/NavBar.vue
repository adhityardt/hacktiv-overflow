<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <button type="button" id="sidebarCollapse" class="navbar-btn">
              <span></span>
              <span></span>
              <span></span>
      </button>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExample05">
          <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
              <a class="nav-link disabled" href="#">Disabled</a>
          </li>
          <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="http://example.com" id="dropdown05" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
              <div class="dropdown-menu" aria-labelledby="dropdown05">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
              </div>
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
