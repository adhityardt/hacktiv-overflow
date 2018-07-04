<template>
  <div>
    <div class="wrapper">
      
      <!-- Page Content Holder -->
      <div id="content">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarsExample05">
              <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <router-link :to="{path: '/mainpage/'}">
                  <h3 style="color: white;">KURA KUORA </h3>
                </router-link>
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
        <Content/>
      </div>
    </div>
    <div class="modal fade" id="newQuestionModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Kura-Kuora</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h5>You are asking a question</h5>
            <p>How to quickly get a good answer</p>
            <ul style="text-align:left;">
              <li>Keep your question short and to the point</li>
              <li>Check for grammar and spelling errors</li>
              <li>Phrase it like a question</li>
              <li>Choose or create a topic that describe your question</li>
            </ul>
            <hr>
            <form class="form-signin">
              <h6 class="h6 mb-3 font-weight-normal" style="text-align:left;">{{usersDb.filter(function (el) {return el['.key'] == userId})[0].name}} added</h6>
              <h5>Question</h5>
              <input type="text" class="form-control" placeholder="Start your question with 'What', 'How', 'Why', etc" v-model="question">
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="submitQuestion" data-dismiss="modal">Submit question</button>
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
              <h5>{{questionPicked}}</h5>
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
    <!-- <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Kura-Kuora</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h5>You are editing a question</h5>
            <h5>{{editQuestion}}</h5>
            <hr>
            <form class="form-signin">
              <h6 class="h6 mb-3 font-weight-normal">{{usersDb.filter(function (el) {return el['.key'] == userId})[0].name}} added</h6>
              <input type="text" class="form-control" placeholder="Edit the question here" v-model="updateQuestionString">
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="updateQuestion">Submit</button>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Content from '@/components/Content.vue'
export default {
  name: "sidebarnavbar",
  data () {
    return {
      question: '',
      answerHTML: '',
      editQuestion: localStorage.getItem('editQuestionKey'),
      // updateQuestionString: ''
    }
  },
  computed:{
    ...mapState ([
    'questionPicked'
    ])
  },
  components: {
    Content
  },
  computed: {
    ...mapState([
      'userId',
      'usersDb'
    ])
  },
  methods:{
    doLogOut (){
      localStorage.removeItem('userId')
      this.$router.push({name:'home'})
    }, 
    submitQuestion () {
      let payload = {
        question: this.question
      }
      this.addQuestion(payload)
    },
    // updateQuestion () {
    //   this.addUpdateQuestion(this.updateQuestionString)
    // },
    putAnswerToDb () {
      let payload = {
        question: localStorage.getItem('questionPicked'),
        answer: this.answerHTML
      }
      this.addAnswerDb(payload)
    },
    ...mapActions ([
      'addQuestion',
      'addAnswerDb',
      // 'addUpdateQuestion'
    ])
  }
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
svg:not(:root).svg-inline--fa {
  overflow: visible;
}
.svg-inline--fa {
  display: inline-block;
  font-size: inherit;
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.225em;
}
.svg-inline--fa.fa-w-1 {
  width: 0.0625em;
}
.svg-inline--fa.fa-w-2 {
  width: 0.125em;
}
.svg-inline--fa.fa-w-3 {
  width: 0.1875em;
}
.svg-inline--fa.fa-w-4 {
  width: 0.25em;
}
.svg-inline--fa.fa-w-5 {
  width: 0.3125em;
}
.svg-inline--fa.fa-w-6 {
  width: 0.375em;
}
.svg-inline--fa.fa-w-7 {
  width: 0.4375em;
}
.svg-inline--fa.fa-w-8 {
  width: 0.5em;
}
.svg-inline--fa.fa-w-9 {
  width: 0.5625em;
}
.svg-inline--fa.fa-w-10 {
  width: 0.625em;
}
.svg-inline--fa.fa-w-11 {
  width: 0.6875em;
}
.svg-inline--fa.fa-w-12 {
  width: 0.75em;
}
.svg-inline--fa.fa-w-13 {
  width: 0.8125em;
}
.svg-inline--fa.fa-w-14 {
  width: 0.875em;
}
.svg-inline--fa.fa-w-15 {
  width: 0.9375em;
}
.svg-inline--fa.fa-w-16 {
  width: 1em;
}
.svg-inline--fa.fa-w-17 {
  width: 1.0625em;
}
.svg-inline--fa.fa-w-18 {
  width: 1.125em;
}
.svg-inline--fa.fa-w-19 {
  width: 1.1875em;
}
.svg-inline--fa.fa-w-20 {
  width: 1.25em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: 0.3em;
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: 0.3em;
  width: auto;
}
.svg-inline--fa.fa-border {
  height: 1.5em;
}
.svg-inline--fa.fa-li {
  width: 2em;
}
.svg-inline--fa.fa-fw {
  width: 1.25em;
}
.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}
.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  -webkit-transform-origin: center center;
  transform-origin: center center;
}
.fa-layers-counter,
.fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}
.fa-layers-text {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  -webkit-transform-origin: center center;
  transform-origin: center center;
}
.fa-layers-counter {
  background-color: #ff253a;
  border-radius: 1em;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #fff;
  height: 1.5em;
  line-height: 1;
  max-width: 5em;
  min-width: 1.5em;
  overflow: hidden;
  padding: 0.25em;
  right: 0;
  text-overflow: ellipsis;
  top: 0;
  -webkit-transform: scale(0.25);
  transform: scale(0.25);
  -webkit-transform-origin: top right;
  transform-origin: top right;
}
.fa-layers-bottom-right {
  bottom: 0;
  right: 0;
  top: auto;
  -webkit-transform: scale(0.25);
  transform: scale(0.25);
  -webkit-transform-origin: bottom right;
  transform-origin: bottom right;
}
.fa-layers-bottom-left {
  bottom: 0;
  left: 0;
  right: auto;
  top: auto;
  -webkit-transform: scale(0.25);
  transform: scale(0.25);
  -webkit-transform-origin: bottom left;
  transform-origin: bottom left;
}
.fa-layers-top-right {
  right: 0;
  top: 0;
  -webkit-transform: scale(0.25);
  transform: scale(0.25);
  -webkit-transform-origin: top right;
  transform-origin: top right;
}
.fa-layers-top-left {
  left: 0;
  right: auto;
  top: 0;
  -webkit-transform: scale(0.25);
  transform: scale(0.25);
  -webkit-transform-origin: top left;
  transform-origin: top left;
}
.fa-lg {
  font-size: 1.33333em;
  line-height: 0.75em;
  vertical-align: -0.0667em;
}
.fa-xs {
  font-size: 0.75em;
}
.fa-sm {
  font-size: 0.875em;
}
.fa-1x {
  font-size: 1em;
}
.fa-2x {
  font-size: 2em;
}
.fa-3x {
  font-size: 3em;
}
.fa-4x {
  font-size: 4em;
}
.fa-5x {
  font-size: 5em;
}
.fa-6x {
  font-size: 6em;
}
.fa-7x {
  font-size: 7em;
}
.fa-8x {
  font-size: 8em;
}
.fa-9x {
  font-size: 9em;
}
.fa-10x {
  font-size: 10em;
}
.fa-fw {
  text-align: center;
  width: 1.25em;
}
.fa-ul {
  list-style-type: none;
  margin-left: 2.5em;
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}
.fa-li {
  left: -2em;
  position: absolute;
  text-align: center;
  width: 2em;
  line-height: inherit;
}
.fa-border {
  border: solid 0.08em #eee;
  border-radius: 0.1em;
  padding: 0.2em 0.25em 0.15em;
}
.fa-pull-left {
  float: left;
}
.fa-pull-right {
  float: right;
}
.fa.fa-pull-left,
.fab.fa-pull-left,
.fal.fa-pull-left,
.far.fa-pull-left,
.fas.fa-pull-left {
  margin-right: 0.3em;
}
.fa.fa-pull-right,
.fab.fa-pull-right,
.fal.fa-pull-right,
.far.fa-pull-right,
.fas.fa-pull-right {
  margin-left: 0.3em;
}
.fa-spin {
  -webkit-animation: fa-spin 2s infinite linear;
  animation: fa-spin 2s infinite linear;
}
.fa-pulse {
  -webkit-animation: fa-spin 1s infinite steps(8);
  animation: fa-spin 1s infinite steps(8);
}
@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}
.fa-rotate-180 {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}
.fa-rotate-270 {
  -webkit-transform: rotate(270deg);
  transform: rotate(270deg);
}
.fa-flip-horizontal {
  -webkit-transform: scale(-1, 1);
  transform: scale(-1, 1);
}
.fa-flip-vertical {
  -webkit-transform: scale(1, -1);
  transform: scale(1, -1);
}
.fa-flip-horizontal.fa-flip-vertical {
  -webkit-transform: scale(-1, -1);
  transform: scale(-1, -1);
}
:root .fa-flip-horizontal,
:root .fa-flip-vertical,
:root .fa-rotate-180,
:root .fa-rotate-270,
:root .fa-rotate-90 {
  -webkit-filter: none;
  filter: none;
}
.fa-stack {
  display: inline-block;
  height: 2em;
  position: relative;
  width: 2em;
}
.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}
.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2em;
}
.fa-inverse {
  color: #fff;
}
.sr-only {
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
.sr-only-focusable:active,
.sr-only-focusable:focus {
  clip: auto;
  height: auto;
  margin: 0;
  overflow: visible;
  position: static;
  width: auto;
}
</style>
