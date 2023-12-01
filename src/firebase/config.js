import { initializeApp } from 'firebase/app'
import { getFirestore, serverTimestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyA6pQgtCHHAOdzjqBPhNOkT9mVMeI6BuSM",
  authDomain: "first-fm-6ff6e.firebaseapp.com",
  projectId: "first-fm-6ff6e",
  storageBucket: "first-fm-6ff6e.appspot.com",
  messagingSenderId: "669596214619",
  appId: "1:669596214619:web:a326db67f1989c1ba9667e",
  measurementId: "G-GBSX4E9B1Y"
}

// init firebase
const app = initializeApp(firebaseConfig)

// init firestore service
const db = getFirestore()
const timestamp = serverTimestamp

// init auth service
const auth = getAuth(app)

// init storage service
const storage = getStorage(app)

export { auth, db, storage, timestamp }