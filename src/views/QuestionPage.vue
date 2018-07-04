<template>
  <div>
    <NavBar/>
    <Questions/>
    <CommentModal/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Questions from '@/components/Questions.vue'
import CommentModal from '@/components/CommentModal.vue'
export default {
  name:'questionpage',
  components: {
    NavBar,
    Questions,
    CommentModal
  }
}
</script>

<style>

</style>
