<template>
  <div>
    <NavBar/>
    <Questions/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Questions from '@/components/Questions.vue'
export default {
  name:'questionpage',
  components: {
    NavBar,
    Questions
  }
}
</script>

<style>

</style>
