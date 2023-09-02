// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyAYRxPmWx8oXJtlyQwLRDua1Jk79mVqdvA',
  authDomain: 'tododb-fb718.firebaseapp.com',
  projectId: 'tododb-fb718',
  storageBucket: 'tododb-fb718.appspot.com',
  messagingSenderId: '376138181790',
  appId: '1:376138181790:web:f30bec23e51632cac21f8f',
  measurementId: 'G-W9DJ667PB0',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

const auth = getAuth(app)

export { auth, db }
