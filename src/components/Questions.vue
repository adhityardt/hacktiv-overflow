<template>
  <div>
    <!-- <h1>ini component question</h1>
    <h5>{{$route.params.questionurl}}</h5> -->
    <div class="card" style="margin-bottom:5px;">
      <div class="card-body">
        <h3>{{question}}</h3>
      </div>
      <!-- <h4>{{questionDb.filter(function(el){return el['.key'] == question})[0].createdBy}}</h4> -->
        <!-- <h4>{{questionDb.filter(function(el){return el[localStorage.getItem('questionRef')]})}}</h4> -->
      <div class="card-footer">
        <!-- <button data-toggle="modal" data-target="#answerModal" class="btn btn-primary">
          <img src="@/assets/glyphicons-236-pen.png" >  
          Answer
        </button> -->
        <div v-if="questionDb.filter(function(el){return el['.key'] == question})[0].createdBy == userId">
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
      </div>
    </div>
    <h4 style="text-align:left;margin-left:20px;"> {{answersDb.length}} Answers</h4>
    <div class="line"></div>
    <div v-for="(answer, index) in answersDb" :key="index" class="card" style="margin-bottom:5px;">
      <div class="card-body">
        <img src="@/assets/glyphicons-4-user.png">
        {{usersDb.filter(function (el){return el['.key'] == answer.data.userId})[0].name}} answered :
        <br>
      </div>
        <div v-html="answer.data.answer"></div>
        <div id="editButton" v-if="answer.data.userId == userId">
          <button class="btn btn-danger" @click="deleteAnswer(answer.key)"  >
            <img src="@/assets/glyphicons-257-delete.png" >  
            Delete Answer
          </button>
          <button data-toggle="modal" data-target="#updateAnswerModal" class="btn btn-warning" @click="editAnswer(answer.key)"  >
            <img src="@/assets/glyphicons-151-edit.png" >  
            Edit Answer
          </button>
        </div>
        <ul class="list-group list-group-flush" style="text-align: left;">
          <!-- <li v-for="(item, index) in commentsDb" :key="index" class="list-group-item">Cras justo odio {{item}}</li> -->
          <li class="list-group-item">
            <div v-if="commentsDb.filter(function (el){return el['.key'] == answer.key}).length == 1" >
              <h6>
                {{usersDb.filter(function (el){return el['.key'] == commentsDb.filter(function (el){return el['.key'] == answer.key})[0].userId})[0].name}} commented :
              </h6>
              {{commentsDb.filter(function (el){return el['.key'] == answer.key})[0].comment}}
            </div>
            <div v-else>
              <h6>
                No comment
              </h6>
            </div>
          </li>
        </ul>
      <div class="card-footer">
        <button data-toggle="modal" data-target="#commentModal" class="btn btn-info" @click="putAnswerKeyToLocal(answer.key)" style="margin-left:5px;">
          <img src="@/assets/glyphicons-310-comments.png" >  
          Comment
        </button>
        <button class="btn btn-success" @click="incrementUpvote(answer.key, answer.data.userId)" style="margin-left:5px;">
          <img src="@/assets/glyphicons-348-hand-up.png" >  
          Upvote Answer 
          <div v-if="upvotesDb.filter(function (el){return el['.key'] == answer.key}).length !== 0">
            <h6>{{upvotesDb.filter(function (el){return el['.key'] == answer.key})[0].upvoteTotal}}</h6>
          </div>
        </button>
      </div>
      <div class="modal fade" id="commentModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Kura-Kuora</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <h5>You are commenting on an answer</h5>
              <hr>
              <form class="form-signin">
                <h6 class="h6 mb-3 font-weight-normal">{{usersDb.filter(function (el) {return el['.key'] == userId})[0].name}} added a comment</h6>
                <input type="text" class="form-control" placeholder="Insert your comment here" v-model="comment">
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" @click="putCommentToDb">Submit comment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="answerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Kura-Kuora</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h5>You are answering a question</h5>
            <hr>
            <form class="form-signin">
              <h6 class="h6 mb-3 font-weight-normal">{{usersDb.filter(function (el) {return el['.key'] == userId})[0].name}} added</h6>
              <h5>{{questionRef}}</h5>
              <wysiwyg v-model="answerHTML" />
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="putAnswerToDb">Submit answer</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="updateAnswerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Kura-Kuora</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h5>You are editing your answer</h5>
            <hr>
            <form class="form-signin">
              <h6 class="h6 mb-3 font-weight-normal">{{usersDb.filter(function (el) {return el['.key'] == userId})[0].name}} added</h6>
              <h5>{{questionRef}}</h5>
              <wysiwyg v-model="answerHTMLupdate" />
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="putUpdateAnswerToDb">Submit answer</button>
          </div>
        </div>
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
      question: localStorage.getItem('questionRef'),
      comment: '',
      answerHTML: '',
      answerHTMLupdate: ''
    }
  },
  computed: {
    ...mapState([
      'questionDb',
      'answersDb',
      'usersDb',
      'userId',
      'commentsDb',
      'questionRef',
      'upvotesDb'
    ])
  },
  methods: {
    putAnswerToDb () {
      let payload = {
        question: localStorage.getItem('questionRef'),
        answer: this.answerHTML
      }
      this.addAnswerDb(payload)
      window.location.reload()
    },
    putUpdateAnswerToDb () {
      let payload = {
        question: localStorage.getItem('questionRef'),
        answer: this.answerHTMLupdate
      }
      this.updateAnswerDb(payload)
      window.location.reload()
    },
    putCommentToDb () {
      this.addCommentDb(this.comment)
    },
    putAnswerKeyToLocal (answerKey) {
      this.answerKeyToLocal(answerKey)
    },
    incrementUpvote (answerKey, answerId) {
      if (answerId == localStorage.getItem('userId')){
        this.incrementUpvoteDb(answerKey)
      }
    },
    editAnswer (answerKey) {
      localStorage.setItem('updateAnswerKey', answerKey)
    },
    deleteAnswer (answerKey) {
      let payload = {
        question: localStorage.getItem('questionRef'),
        answerKey: answerKey
      }
      this.deleteAnswerDb(payload)
      // window.location.reload()
    },
    noAnswer () {
      this.noAnswerNotif()
    },
    ...mapActions([
      'getAnswers',
      'addAnswerDb',
      'addCommentDb',
      'answerKeyToLocal',
      'getComments',
      'incrementUpvoteDb',
      'updateAnswerDb',
      'deleteAnswerDb',
      'noAnswerNotif'
    ])
  },
  created () {
    this.getAnswers(localStorage.getItem('questionRef'))
  }
}
</script>

<style>
#editButton{
  display: flex;
  flex-direction: row-reverse;
}
</style>
