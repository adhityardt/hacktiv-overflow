<template>
  <div>
    <div class="card" style="margin-bottom:5px;">
      <div class="card-body">
        <img src="@/assets/glyphicons-4-user.png">
        {{usersDb.filter(function (el) {return el['.key'] == userId})[0].name}}
        <br>
      </div>
      <h4 style="text-align:left; margin-left:20px; color:grey;"> <a href="" data-toggle="modal" data-target="#newQuestionModal">What is Your Question?</a> </h4>
    </div>
    <div v-for="(question, index) in questionDb" :key="index" class="card" style="margin-bottom:5px;">
      <div class="card-body">
        <router-link :to="{path: '/question/' + question['.key']}">
          <h3 @click="putQuestionLinkToLocal(question['.key'])">
          {{question['.key']}}
          </h3>
        </router-link>
      </div>
      <div class="card-footer">
        <button data-toggle="modal" data-target="#answerModal" class="btn" @click="putQuestionToState(question['.key'])">
          <img src="@/assets/glyphicons-236-pen.png" >  
          Answer
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions,mapState } from 'vuex'
export default {
  name: 'content',
  methods: {
    putQuestionToState (questionPicked) {
      this.putQuestionPickedToState(questionPicked)
    },
    putQuestionLinkToLocal (question) {
      this.putQuestionToLocal(question)
    },
    ...mapActions([
      'addAnswerDb',
      'putQuestionPickedToState',
      'createURL',
      'putQuestionToLocal'
    ])
  },
  computed:{
    ...mapState([
      'questionDb',
      'usersDb',
      'questionUrl',
      'userId'
    ])
  }
}
</script>

<style>
.card-body{
  display: flex;
  justify-content: flex-start;
  align-content: flex-start;
}
.card-footer{
  display: flex;
  align-content: flex-start;
}
</style>
