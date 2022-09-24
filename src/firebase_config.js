import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCMEhnxosw2-emi1BF_c6xRZEhOIen9SE4',
  authDomain: 'todoapp-ce99c.firebaseapp.com',
  projectId: 'todoapp-ce99c',
  storageBucket: 'todoapp-ce99c.appspot.com',
  messagingSenderId: '895517095891',
  appId: '1:895517095891:web:941a1e6df69e36e98ca126',
}

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig)

// Use these for db & auth
const db = firebaseApp.firestore()
const auth = firebase.auth()

export { auth, db }
