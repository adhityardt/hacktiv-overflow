<template>
  <div>
    <!-- <h1>ini component question</h1>
    <h5>{{$route.params.questionurl}}</h5> -->
    <div class="card" style="margin-bottom:5px;">
      <div class="card-body">
        <h3>{{question}}</h3>
      </div>
      <div class="card-footer">
        <button data-toggle="modal" data-target="#answerModal" class="btn" @click="putQuestionToState(question['.key'])">
          <img src="@/assets/glyphicons-236-pen.png" >  
          Answer
        </button>
      </div>
    </div>
    <h4 style="text-align:left;margin-left:20px;"> Answers</h4>
    <div class="line"></div>
    <div v-for="(answer, index) in answersDb" :key="index" class="card" style="margin-bottom:5px;">
      <div class="card-body">
        <img src="@/assets/glyphicons-4-user.png">
        Someone name
        <br>
      </div>
        <!-- <p>{{questionDb.filter(function (el){return el['.key'] == question})[0]}}</p> -->
        <!-- <div v-html="questionDb.filter(function (el){return el['.key'] == question})[0]['-LGU_lFXSv5dFWN8-2CL'].answer"></div> -->
        <div v-html="answer.data.answer"></div>
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
import { mapState, mapActions } from 'vuex'
export default {
  name: 'questions',
  data () {
    return {
      question: localStorage.getItem('questionRef')
    }
  },
  computed: {
    ...mapState([
      'questionDb',
      'answersDb'
    ])
  },
  methods: {
    print () {
      console.log(this.answersDb)
    },
    ...mapActions([
      'getAnswers'
    ])
  },
  created () {
    this.getAnswers(localStorage.getItem('questionRef'))
  }
}
</script>

<style>

</style>
