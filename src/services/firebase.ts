import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCFCNAF1y90lZ4ek-Ik59CQEbF1sDmpTgQ',
  authDomain: 'tiberius-b5ceb.firebaseapp.com',
  projectId: 'tiberius-b5ceb',
  storageBucket: 'tiberius-b5ceb.appspot.com',
  messagingSenderId: '495772983150',
  appId: '1:495772983150:web:0778517bf42027c97b2b7f',
  measurementId: 'G-WGQLDY7LBM',
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid
    console.warn('user is signed in', { user, uid })
  } else {
    console.warn('user was signed out')
  }
})

const googleProvider = new GoogleAuthProvider()
const signInWithGoogle = () => signInWithPopup(auth, googleProvider)

const db = getFirestore(app)

export { auth, googleProvider, signInWithGoogle, db }
export type { User }
