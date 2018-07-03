<template>
  <div class="home">
    <LoginAndRegister/>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginAndRegister from '@/components/LoginAndRegister.vue'

export default {
  name: 'home',
  components: {
    LoginAndRegister
  }
}
</script>
