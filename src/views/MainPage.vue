<template>
  <div>
    <SideBarNavBar> </SideBarNavBar>
  </div>
</template>

<script>
import SideBarNavBar from '@/components/SideBarNavBar.vue'  
export default {
  name: 'mainpage',
  components: {
    SideBarNavBar
  },
  created () {
    if (!localStorage.getItem('userId')) {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style>

</style>
