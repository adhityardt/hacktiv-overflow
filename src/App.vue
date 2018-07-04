<template>
  <div id="app">
    <div>
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <router-view/>
  </div>
</template>
<script>
import {db} from './firebase.js'
import {mapActions} from 'vuex'
export default {
  firebase: {
    questions: db.ref('/Questions'),
    users: db.ref('/Users'),
    comments: db.ref('/Comments'),
    upvotes: db.ref('/Upvotes')
  },
  methods: {
    ...mapActions([
      'setQuestionDb',
      'setUsersDb',
      'setCommentsDb',
      'setUpvotesDb'
    ])
  },
  created () {
    this.setQuestionDb(this.questions)
    this.setUsersDb(this.users)
    this.setCommentsDb(this.comments)
    this.setUpvotesDb(this.upvotes)
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
