import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, User, fetchSignInMethodsForEmail } from 'firebase/auth'
import { getFirestore, initializeFirestore, persistentLocalCache } from 'firebase/firestore'

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

initializeFirestore(app, { localCache: persistentLocalCache(/*settings*/ {}) })

const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider()
const signInWithGoogle = () => signInWithPopup(auth, googleProvider)

const db = getFirestore(app)

export { googleProvider, signInWithGoogle, db, app, auth, fetchSignInMethodsForEmail }
export type { User }
