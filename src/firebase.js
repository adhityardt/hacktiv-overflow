import { initializeApp } from 'firebase'

const firebaseApp = initializeApp({
  apiKey: '',
  databaseURL: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: ''
})

export const db = firebaseApp.database()
export const user = firebaseApp.auth()
export const storageRef = firebaseApp.storage()
