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
      <div class="card-body" id="createdby">
        <h6>created by: {{usersDb.filter(function (el) {return el['.key'] == question['createdBy']})[0].name}}</h6>
        <router-link :to="{path: '/question/' + question['.key']}">
          <h3 @click="putQuestionLinkToLocal(question['.key'])">
          {{question['.key']}}
          </h3>
        </router-link>
      </div>
      <div class="card-footer">
          <!-- <h6>{{question['createdBy']}}</h6>
          <br>
          <h6>user id {{userId}}</h6> -->
        <div v-if="question['createdBy'] == userId">
          <button class="btn btn-light" @click="noAnswer">
            <img src="@/assets/glyphicons-236-pen.png" >  
            Answer
          </button>
        </div>
        <div v-else>
          <button data-toggle="modal" data-target="#answerModal" class="btn btn-primary" @click="putQuestionToState(question['.key'])">
            <img src="@/assets/glyphicons-236-pen.png" >  
            Answer
          </button>
        </div>
        <!-- <div v-if="question['createdBy'] == userId">
          <button data-toggle="modal" data-target="#editModal" class="btn" @click="editQuestion(question['.key'])" style="margin-left: 5px;">
            <img src="@/assets/glyphicons-151-edit.png" >  
            Edit
          </button>
        </div> -->
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
    editQuestion (questionKey) {
      this.putEditQuestionLocal(questionKey)
    },
    noAnswer () {
      this.noAnswerNotif()
    },
    ...mapActions([
      'addAnswerDb',
      'putQuestionPickedToState',
      'createURL',
      'putQuestionToLocal',
      'putEditQuestionLocal',
      'noAnswerNotif'
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
#createdby{
  display: flex;
  flex-direction: column;
  text-align: left;
}
</style>
