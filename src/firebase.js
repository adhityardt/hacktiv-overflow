import { initializeApp } from 'firebase'

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyCy5tBsK_OG8jqTa257wL2BZ5DgjK-plWw',
  databaseURL: 'https://kura-kuora.firebaseio.com',
  authDomain: 'kura-kuora.firebaseapp.com',
  projectId: 'kura-kuora',
  storageBucket: 'kura-kuora.appspot.com',
  messagingSenderId: '206600391195'
})

export const db = firebaseApp.database()
export const user = firebaseApp.auth()
export const storageRef = firebaseApp.storage()
