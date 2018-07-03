import Vue from 'vue'
import Vuex from 'vuex'
import { user, db } from './firebase.js'
import alertify from 'alertifyjs'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questionDb: '',
    usersDb: '',
    questionPicked: '',
    questionUrl: '',
    userId: localStorage.getItem('userId'),
    answersDb: ''
  },
  mutations: {
    setUserId (state, payload) {
      state.userId = payload
    },
    setQuestionDb (state, payload) {
      state.questionDb = payload
    },
    setUsersDb (state, payload) {
      state.usersDb = payload
    },
    questionPickedToState (state, payload) {
      state.questionPicked = payload
    },
    createUrl (state, payload) {
      state.questionUrl = payload
    },
    getAnswers (state, payload) {
      state.answersDb = payload
    }
  },
  actions: {
    logIn ({ commit }, payload) {
      user.signInWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          localStorage.setItem('userId', response.user.uid)
          commit('setUserId', response.user.uid)
          console.log(response.user)
          alertify
            .alert('You have successfully logged in', function () {
              alertify.message('You are now logged in')
            })
          router.push({name: 'mainpage'})
        })
        .catch(error => {
          alertify
            .alert('Email or password is wrong', function () {
              alertify.message('Please check or re-enter your email and password')
            })
          console.log(error)
        })
    },
    register ({commit}, payload) {
      user.createUserWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          db.ref('/Users/').child(response.user.uid).set({
            name: payload.name,
            email: payload.email
          })
          alertify
            .alert('You have successfully registered', function () {
              alertify.message('You are registered to the database')
            })
        })
        .catch(err => {
          alertify
            .alert('Email or password is wrong', function () {
              alertify.message('Please check or re-enter your email and password')
            })
          console.log(err)
        })
    },
    addQuestion ({commit}, payload) {
      db.ref('/Questions/' + payload.question).set({
        createdBy: localStorage.getItem('userId')
      })
    },
    setQuestionDb ({commit}, payload) {
      commit('setQuestionDb', payload)
    },
    setUsersDb ({commit}, payload) {
      commit('setUsersDb', payload)
    },
    putQuestionPickedToState ({commit}, payload) {
      commit('questionPickedToState', payload)
      localStorage.setItem('questionPicked', payload)
    },
    addAnswerDb ({commit}, payload) {
      db.ref('/Questions/' + payload.question).push({
        answer: payload.answer,
        userId: localStorage.getItem('userId')
      })
      // .then(response => {
      //   db.ref(`/${payload.question}/`).push({
      //     answer: payload.answer,
      //     userId: localStorage.getItem('userId')
      //   })
      // })
    },
    putQuestionToLocal ({commit}, payload) {
      localStorage.setItem('questionRef', payload)
    },
    getAnswers ({commit}, payload) {
      let answerList = []
      db.ref(`/Questions/${payload}`).on('value', (snapshot) => {
        snapshot.forEach(snap => {
          let result = {
            key: snap.key,
            data: snap.val()
          }
          answerList.push(result)
        })
        commit('getAnswers', answerList)
      })
    }
  }
})
